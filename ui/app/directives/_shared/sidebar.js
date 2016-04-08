import angular from 'angular';
import ngAnimate from 'angular-animate';

export default angular.module('directives.sideBar', [ngAnimate])
	.directive('sideBar', () => {
		return {
			restrict: 'E',
			templateUrl: 'templates/sideBar.html',
			replace: true,
			controller: ($scope) => {
				$scope.elements = [1,2,3];

				$scope.linkClicked = (index) => {
					console.log(index);
				};

				$scope.bool = true;
			}
		};
	});
