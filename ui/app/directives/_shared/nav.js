import angular from 'angular';

export default angular.module('directives.nav', [])
	.directive('nav', () => {
		return {
			restrict: 'E',
			templateUrl: 'templates/nav.html',
			replace: true,
			controller: ($scope) => {
				$scope.elements = [1,2,3];
				
				$scope.linkClicked = (index) => {;
					console.log(index);
				};
			}
		};
	});
