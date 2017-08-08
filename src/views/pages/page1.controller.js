'use strict';

app.controller('Page1Controller', [
	'$scope',
	'$mdColorPalette',
	function($scope, $mdColorPalette) {
		$scope.color = {
			background: 'grey',
			foreground: 'indigo'
		};

		$scope.colors = Object.keys($mdColorPalette);
	}
]);
