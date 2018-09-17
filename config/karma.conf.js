module.exports = (config) => {
	const fs = require('fs');

	let library = false;

	let vendor = './dist/js/vendor.js';
	if(!fs.existsSync(vendor)) {
		vendor = './build/vendor.js';
		library = true;
	}

	let files = [
		vendor,
		{
			pattern: require.resolve('jasmine-jquery'),
			watched: false,
			served: true
		},
		/*{
			pattern: require.resolve('angular-mocks'),
			watched: false,
			served: true
		}*/
	];

	let prefix;

	if(process.env.TEST_BUNDLE && !/^\s*$/.test(process.env.TEST_BUNDLE)) {
		files.push(
			'./src/vars.js',
			'./dist/js/*.js'
		);
		if(!library) {
			files.push('./dist/tmpl/*.html');
		}
		prefix = 'dist/tmpl/';
	}
	else {
		files.push(
			'./tests/test-start.js',
			'./src/vars.js',
			'./src/main.js',
			'./src/components/**/*.js'
		);

		if(library) {
			files.push('./build/templates.js');
		}
		else {
			files.push(
				'./src/views/**/*.js',
				'./src/views/**/*.html'
			);
		}

		prefix = 'src/';
	}

	let browsers = process.env.TEST_BROWSERS;
	if(browsers) {
		browsers = browsers.split(/\s+/);
	}
	if(!(browsers && browsers[0])) {
		browsers = ['Chromium'];
	}

	files.push('./tests/**/*.test.js');

	config.set({
		basePath: '../',

		files: files,

		frameworks: ['jasmine'],

		preprocessors: {
			'./src/views/**/*.html': ['ng-html2js'],
			'./dist/tmpl/*.html': ['ng-html2js']
		},
		ngHtml2JsPreprocessor: {
			stripPrefix: prefix,
			moduleName: 'ngTemplates'
		},

		reporters: ['spec'],
		specReporter: {
			maxLogLines: 5,
			suppressErrorSummary: false,
			suppressFailed: false,
			suppressPassed: false,
			suppressSkipped: true,
			showSpecTiming: false,
			failFast: false
		},

		port: 9876,

		colors: true,
		logLevel: config.LOG_INFO,

		autoWatch: true,
		singleRun: false,

		browsers: browsers
	});
};
