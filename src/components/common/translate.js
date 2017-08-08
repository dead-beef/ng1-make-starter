'use strict';

exports.translate = angular
	.module(
		APP_NAME + '.translate',
		[
			APP_NAME + '.info',
			'pascalprecht.translate',
			'ngCookies',
			'ngStorage'
		]
	)
	.config([
		'$translateProvider',
		'defaultLanguage',
		function($translateProvider, defaultLanguage) {
			$translateProvider
				.useStaticFilesLoader({
					prefix: 'languages/',
					suffix: '.json'
				})
				.useSanitizeValueStrategy('escape')
				.preferredLanguage(defaultLanguage)
				.fallbackLanguage(defaultLanguage)
				.useLocalStorage();
		}
	]);
