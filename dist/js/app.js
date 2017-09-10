"use strict";!function(e,a){"function"==typeof define&&define.amd?define(["jquery","angular","angular-cookies","ngstorage","@uirouter/angularjs","angular-animate","angular-aria","angular-combine","angular-material","angular-translate","angular-translate-loader-static-files","angular-translate-storage-cookie","angular-translate-storage-local"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery"),require("angular"),require("angular-cookies"),require("ngstorage"),require("@uirouter/angularjs"),require("angular-animate"),require("angular-aria"),require("angular-combine"),require("angular-material"),require("angular-translate"),require("angular-translate-loader-static-files"),require("angular-translate-storage-cookie"),require("angular-translate-storage-local")):a(e.jQuery,e.angular)}(this,function(e,a){var r=["ngAnimate","ngAria","ngMaterial","ngStorage","pascalprecht.translate","ui.router","app.info","app.translate","app.stateData"],t=["$stateProvider","$urlRouterProvider","$mdIconProvider"],n=[];"undefined"!=typeof jasmine||(r.push("angularCombine"),t.push("angularCombineConfigProvider")),t.push(function(e,a,r,t){void 0!==t&&t.addConf(/./,"tmpl/app.html"),r.defaultFontSet("material-icons"),a.otherwise("/"),e.state("main",{url:"/",data:{pageTitle:"app.title",pageLead:"app.brief"}}).state("page1",{url:"/page1",templateUrl:"views/pages/page1.html",data:{pageTitle:"app.title",pageLead:"app.brief"}}).state("page2",{url:"/page2",templateUrl:"views/pages/page2.html",data:{pageTitle:"nav.header.short",pageLead:"nav.header"}})}),n.push(function(){});var o=a.module("app",r).config(t).run(n);a.module("app.info",[]).constant("version","1.0").constant("languages",["en","ru"]).constant("defaultLanguage","en").directive("appVersion",["version",function(e){return function(a,r){r.text(e)}}]).directive("currentYear",function(){return{link:function(e,a){a.html("&copy; "+(new Date).getFullYear())}}}),o.directive("replace",["$compile","$templateRequest",function(e,a){return{restrict:"E",link:function(r,t,n){var o=n.src;a(o).then(function(a){t.html(a),a=t.children(),t.replaceWith(a),e(a)(r)})}}}]),a.module("app.stateData",["ui.router"]).run(["$transitions","$rootScope",function(e,a){e.onSuccess({},function(e){var r=e.to();a.stateData=r.data,a.stateName=r.name})}]);var l=a.module("app.translate",["app.info","pascalprecht.translate","ngCookies","ngStorage"]).config(["$translateProvider","defaultLanguage",function(e,a){e.useStaticFilesLoader({prefix:"languages/",suffix:".json"}).useSanitizeValueStrategy("escape").preferredLanguage(a).fallbackLanguage(a).useLocalStorage()}]);l.directive("languageSelect",function(){return{restrict:"E",replace:!0,templateUrl:"views/common/language-select.html",controller:"LanguageController",controllerAs:"language"}}),l.directive("languageMenu",function(){return{restrict:"E",replace:!0,templateUrl:"views/common/language-menu.html",controller:"LanguageController",controllerAs:"language"}}),l.controller("LanguageController",["$translate","$scope","languages",function(e,a,r){a.vm={languages:r,language:null},a.$watch(function(){return e.use()},function(e){a.vm.language=e}),a.$watch("vm.language",function(a){e.use(a)})}]),o.directive("navBar",function(){return{restrict:"E",replace:!0,templateUrl:"views/nav/nav.html",controller:"NavController",controllerAs:"navbar"}}),o.controller("NavController",[function(){}]),o.directive("sideNav",["$transitions","$timeout",function(e,a){return{restrict:"E",replace:!0,templateUrl:"views/nav/sidenav.html",controller:"SideNavController",controllerAs:"sidenav",link:function(r,t){e.onBefore({},r.sidenav.close),e.onSuccess({},function(){a(function(){t.find("md-list-item > .md-button").removeClass("md-focused"),t.find("md-list-item.active > .md-button").addClass("md-focused")})})}}}]),o.controller("SideNavController",["$mdSidenav",function(e){var a=function(){return e("sidenav")};this.open=function(){a().open()},this.toggle=function(){a().toggle()},this.close=function(){a().close()}}]),o.controller("Page1Controller",["$scope","$mdColorPalette",function(e,a){e.color={background:"grey",foreground:"indigo"},e.colors=Object.keys(a)}]),o.controller("page2Controller",["$scope",function(e){function a(e,a){return Math.floor(Math.random()*(a-e))+e}function r(){return String.fromCharCode(a(l,i))}function t(e){return e.replace(/^./,function(e){return e.toUpperCase()})}function n(e,t){for(var n=a(e,t),o=[],l=0;l<n;o.push(r()),++l);return o.join("")}function o(e,r,o,l){var i=a(e,r);if(!i)return"";var u=[t(n(o,l))];--i;for(var c=0;c<i;++c)u.push(n(o,l));return u.join(" ")+"."}var l="a".charCodeAt(0),i="z".charCodeAt(0)+1;e.text=function(e,r,t,n,l,i){for(var u=a(e,r),c=[],s=0;s<u;++s)c.push(o(t,n,l,i));return c.join(" ")}(128,256,4,16,2,8)}])});