var APP_CONFIG = [
	'$stateProvider',
	'$urlRouterProvider',
	'$mdIconProvider'
];

var APP_RUN = [
];

if(!TESTING) {
	APP_DEPS.push('angularCombine');
	APP_CONFIG.push('angularCombineConfigProvider');
}

APP_CONFIG.push(function(
	$stateProvider,
	$urlRouterProvider,
	$mdIconProvider,
	angularCombineConfigProvider
) {
	if(angularCombineConfigProvider !== undefined) {
		angularCombineConfigProvider.addConf(/./, 'tmpl/app.html');
	}

	$mdIconProvider.defaultFontSet('material-icons');

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('main', {
			url: '/',
			//templateUrl: 'views/common/layout.html',
			data: {
				pageTitle: 'app.title',
				pageLead: 'app.brief'
			}
		})
		.state('page1', {
			url: '/page1',
			templateUrl: 'views/pages/page1.html',
			data: {
				pageTitle: 'app.title',
				pageLead: 'app.brief'
			}
		})
		.state('page2', {
			url: '/page2',
			templateUrl: 'views/pages/page2.html',
			data: {
				pageTitle: 'nav.header.short',
				pageLead: 'nav.header'
			}
		});
});

APP_RUN.push(function() {
});

// eslint-disable-next-line no-unused-vars
var app = exports.main = angular
	.module(APP_NAME, APP_DEPS)
	.config(APP_CONFIG)
	.run(APP_RUN);
