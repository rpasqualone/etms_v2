import angular from 'angular';
import ngAnimate from 'angular-animate';

export default angular.module('directives.usersTale', [ngAnimate])
	.directive('dashboard', () => {
		return {
			restrict: 'E',
			templateUrl: 'templates/dashboard.html',
			replace: true,
			controller: ($scope) => {
				$scope.elements = [1,2,3];

				$scope.linkClicked = (index) => {
					console.log(index);
				};
			}
		};
	});
