OVERRIDE_CONFIG_FILE := config/override.js
include make/Makefile

LINT_ENABLED := 1

APP_NAME := app
VENDOR_NAME := vendor
APP_DIR := src
CONFIG_DIR := config

FONT_TYPES := *.otf *.eot *.svg *.ttf *.woff *.woff2
COPY_TYPES := *.jpg *.jpe *.jpeg *.png *.gif *.svg *.ico *.json
COPY_TYPES += $(FONT_TYPES)
COPY_IGNORE :=

COPY_FILES :=
COPY_FILES += $(call rwildcards,$(APP_DIR)/,$(COPY_TYPES))
COPY_FILES := $(filter-out $(COPY_IGNORE),$(COPY_FILES))

JS_DIRS := $(addprefix $(APP_DIR)/,components views urls mock-backend)
JS_FILES := $(APP_DIR)/vars.js \
            $(foreach d,$(JS_DIRS),$(call rwildcard,$d/,*.js)) \
            $(APP_DIR)/main.js

TMPL_DIR := $(APP_DIR)
TMPL_FILES := $(call rwildcard,$(TMPL_DIR)/views,*.slm)
TMPL_FILES := $(TMPL_FILES:$(TMPL_DIR)/%.slm=$(BUILD_DIR)/%.html)

WATCH_FILES := '$(APP_DIR)/**/*' '$(CONFIG_DIR)/**/*' package.json Makefile

MAKEFILES += $(lastword $(MAKEFILE_LIST))

TARGETS += start stop watch min-watch
TEST_TARGETS := test test-watch test-e2e

INCLUDE_PATH := $(INCLUDE_PATH):$(BUILD_DIR)

# $(call build-js, src_files, dist_file[, enable_lint=false])
define build-js
$(call build-and-minify,\
    $(1),\
    $(BUILD_DIR)/js/$(2),\
    $(MIN_DIR)/js/$(2),\
    CONCAT,UGLIFYJS,$(if $3,ESLINT,))
endef
#    SOURCE_MAP_CONCAT,SOURCE_MAP_UGLIFY,$(if $3,ESLINT,)

# $(call build-tmpl, src_files, dist_file)
define build-tmpl
$(call build-and-minify,\
    $(1),\
    $(BUILD_DIR)/tmpl/$(2),\
    $(MIN_DIR)/tmpl/$(2),\
    NG1_TEMPLATE_CONCAT,HTML_MINIFIER)
endef

# $(call build-css, src_file, dist_file)
define build-css
$(call build,\
    $(APP_DIR)/css/$(1),\
    $(BUILD_DIR)/tmp-css/$(2),\
    NODE_SASS, ,SASS_MAKEDEPEND) \
$(call build-and-minify,\
    $(BUILD_DIR)/tmp-css/$(2),\
    $(BUILD_DIR)/css/$(2),\
    $(MIN_DIR)/css/$(2),\
    AUTOPREFIXER,CSSO)
endef

# $(call build-icon-font, font-name)
build-icon-font = $(eval $(call do-build-icon-font,$1))

# $(eval $(call do-build-icon-font, font-name))
define do-build-icon-font
$(eval _fonts := $(addprefix $(DIST_DIR)/fonts/$1/$1,.otf .ttf .woff .woff2 .svg))
$(eval _css := $(BUILD_DIR)/$1.css)
$(eval _deps := $(APP_DIR)/fonts/$1/glyphs)
$(eval _deps += $(call wildcard,$(APP_DIR)/fonts/$1/img/*))

$(call mkdirs, $(PKG_DIST_DIR) $(DIST_DIR)/fonts/$1)

all min: $(_fonts) $(_css)

$(BUILD_DIR)/tmp-css/$(APP_NAME).css: $(_css)

$(_fonts) $(_css): $(_deps) | $(DIST_DIR)/fonts/$1
	./create-icon-font -i $(APP_DIR)/fonts/$1/glyphs \
	                   -I $(APP_DIR)/fonts/$1/img \
	                   -n $1 \
	                   -c $(BUILD_DIR) -f $(DIST_DIR)/fonts/$1 -F ../fonts/$1
endef

$(call build-js,$(JS_FILES),$(APP_NAME).js,true)
$(call build-js,$(VENDOR_JS_FILES),$(VENDOR_NAME).js)

$(call build-css,$(APP_NAME).scss,$(APP_NAME).css)
$(call build-css,$(VENDOR_NAME).scss,$(VENDOR_NAME).css)

$(call build-wildcards,*.slm,$(TMPL_DIR),$(BUILD_DIR),.slm,.html,SLM)
TMPL_DIR := $(BUILD_DIR)
$(call build-tmpl,$(TMPL_FILES),$(APP_NAME).html)

$(call copy-files,$(BUILD_DIR)/index.html,$(BUILD_DIR),$(DIST_DIR))
$(call copy-files,$(COPY_FILES),$(APP_DIR),$(DIST_DIR))

$(call copy-wildcards,$(FONT_TYPES),\
                      $(RESOLVE_MATERIAL_DESIGN_ICONS_ICONFONT)/dist/fonts,\
                      $(DIST_DIR)/fonts/material-icons)

$(call copy-wildcards,$(FONT_TYPES),\
                      $(RESOLVE_ROBOTO_FONTFACE)/fonts/roboto,\
                      $(DIST_DIR)/fonts/roboto)

$(call copy-wildcards,$(FONT_TYPES),\
                      node_modules/font-awesome/fonts,\
                      $(DIST_DIR)/fonts/font-awesome)

$(call main)

all min: | $(DIST_DIR)/$(APP_DIR)

all:
	$(call prefix,link,$(LN) ../$(BUILD_DIR)/js $(DIST_DIR)/js)
	$(call prefix,link,$(LN) ../$(BUILD_DIR)/css $(DIST_DIR)/css)
	$(call prefix,link,$(LN) ../$(BUILD_DIR)/tmpl $(DIST_DIR)/tmpl)

min:
	$(call prefix,link,$(LN) ../$(MIN_DIR)/js $(DIST_DIR)/js)
	$(call prefix,link,$(LN) ../$(MIN_DIR)/css $(DIST_DIR)/css)
	$(call prefix,link,$(LN) ../$(MIN_DIR)/tmpl $(DIST_DIR)/tmpl)

$(DIST_DIR)/$(APP_DIR): | $(DIST_DIR)
	$(call prefix,mkdir,$(LN) ../$(APP_DIR) $@)

start: stop
	$(call prefix,server,$(SERVER_START))

stop:
	$(call prefix,server,$(SERVER_STOP))

watch:
	$(call prefix,build,-$(RESET_MAKE))
	$(call prefix,watch,$(call WATCH,$(WATCH_FILES),'$(RESET_MAKE)'))

min-watch:
	$(call prefix,build,-$(RESET_MAKE) min)
	$(call prefix,watch,$(call WATCH,$(WATCH_FILES),'$(RESET_MAKE) min'))

#pre-test: all

test:
	$(call prefix,test,karma start config/karma.conf.js --single-run)

test-watch:
	$(call prefix,test,karma start config/karma.conf.js)

test-e2e:
	$(call prefix,test,./e2e-test)
