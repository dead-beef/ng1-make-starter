'use strict';

app.directive('sideNav', [
	'$transitions', '$timeout',
	function($transitions, $timeout) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/nav/sidenav.html',
			controller: 'SideNavController',
			controllerAs: 'sidenav',
			link: function(scope, el/*, attr*/) {
				$transitions.onBefore({}, scope.sidenav.close);
				$transitions.onSuccess({}, function() {
					$timeout(function() {
						el.find('md-list-item > .md-button')
							.removeClass('md-focused');
						el.find('md-list-item.active > .md-button')
							.addClass('md-focused');
					});
				});
			}
		};
	}
]);

app.controller('SideNavController', [ '$mdSidenav', function($mdSidenav) {
	var self = function() { return $mdSidenav('sidenav'); };

	this.open = function() { self().open(); };
	this.toggle = function() { self().toggle(); };
	this.close = function() { self().close(); };
}]);
