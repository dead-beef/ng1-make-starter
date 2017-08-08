'use strict';

(function(root) {
	var APP_NAME_ROOT = 'app';

	var APP_DEPS_AMD = [
		'jquery',
		'angular',
		'angular-cookies',
		'ngstorage',
		'@uirouter/angularjs',
		'angular-animate',
		'angular-aria',
		'angular-combine',
		'angular-material',
		'angular-translate',
		'angular-translate-loader-static-files',
		'angular-translate-storage-cookie',
		'angular-translate-storage-local'
	];
	var APP_DEPS_COMMONJS = APP_DEPS_AMD;
	var APP_DEPS_NODE = APP_DEPS_AMD;
	var APP_DEPS_ROOT = ['$', 'angular'];

	(function(factory) {
		var args;
		if(typeof define === 'function' && define.amd) {
			define(['exports'].concat(APP_DEPS_AMD), factory);
		}
		else if(typeof exports === 'object'
		        && typeof exports.nodeName !== 'string') {
			args = APP_DEPS_COMMONJS.map(require);
			args.unshift(exports);
			factory.apply(root, args);
		}
		else if(typeof module === 'object' && module.exports) {
			args = APP_DEPS_NODE.map(require);
			args.unshift(module.exports = {});
			factory.apply(root, args);
		}
		else {
			var exports = null;
			if(typeof APP_NAME_ROOT === 'string') {
				exports = root[APP_NAME_ROOT] = {};
			}

			args = APP_DEPS_ROOT.map(function(dep) { return root[dep]; });
			args.unshift(exports);

			factory.apply(root, args);
		}
	}(function(exports, $, angular) {
