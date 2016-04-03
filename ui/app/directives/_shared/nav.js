import angular from 'angular';

export default angular.module('directives.nav', [])
	.directive('nav', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/nav.html',
			replace: true,
			controller: function ($scope) {
				$scope.linkClicked = function () {
					console.log('clicked');
				};
			}
		};
	}).name;
