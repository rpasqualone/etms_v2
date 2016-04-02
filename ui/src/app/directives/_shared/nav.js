angular.module('app.nav', [])
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
	});
