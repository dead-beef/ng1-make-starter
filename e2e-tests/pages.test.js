'use strict';

describe('page1', function() {

	function mdSelect(select, value) {
		return select.click()
			.then(function() { return select.getAttribute('aria-owns'); })
			.then(function(id) {
				return element(by.id(id))
					.$$('md-option[value="' + value + '"]')
					.first();
			})
			.then(function(options) { options.click(); });
	}

	var fgInput, bgInput, container;

	beforeAll(function() {
		//browser.ignoreSynchronization = false;
		browser.get('');
		browser.setLocation('page1');

		fgInput = element(by.model('color.foreground'));
		bgInput = element(by.model('color.background'));
		container = $('[ng-controller="Page1Controller"]');
	});

	it('should load', function() {
		expect(container.isDisplayed()).toBeTruthy();
		expect(fgInput.isDisplayed()).toBeTruthy();
		expect(bgInput.isDisplayed()).toBeTruthy();
	});

	it('should set form colors', function(done) {
		var bg = 'blue';
		var fg = 'purple';

		var oldBg, oldFg;

		container.getCssValue('color')
			.then(function(color) {
				oldFg = color;
				return container.getCssValue('background-color');
			})
			.then(function(color) {
				oldBg = color;
				return mdSelect(fgInput, fg);
			})
			.then(function() {
				return mdSelect(bgInput, bg);
			})
			.then(function() { return container.getCssValue('color'); })
			.then(function(color) {
				expect(color).not.toEqual(oldFg);
				return container.getCssValue('background-color');
			})
			.then(function(color) {
				expect(color).not.toEqual(oldBg);
				done();
			});
	});

	it('should unload', function() {
		browser.setLocation('');
		expect(container.isPresent()).toBeFalsy();
		browser.setLocation('page1');
	});

});

describe('page2', function() {

	beforeAll(function() {
		browser.get('');
		browser.setLocation('page2');
	});

	it('should load', function() {
		expect(element(by.binding('text')).isDisplayed()).toBeTruthy();
	});

	it('should generate text', function(done) {
		element(by.binding('text')).getText().then(function(text) {
			expect(text.length).toBeGreaterThan(0);
			done();
		});
	});

	it('should generate new text after reloading', function(done) {
		var oldText;
		element(by.binding('text'))
			.getText()
			.then(function(text) {
				oldText = text;
				browser.setLocation('');
				browser.setLocation('page2');
				return element(by.binding('text')).getText();
			})
			.then(function(text) {
				expect(text).not.toEqual(oldText);
				done();
			});
	});
});
