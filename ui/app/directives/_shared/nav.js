import angular from 'angular';

export default angular.module('directives.nav', [])
	.directive('nav', () => {
		return {
			restrict: 'E',
			templateUrl: 'templates/nav.html',
			replace: true,
			controller: ($scope) => {
				$scope.linkClicked = () => {
					var props = {x: 2};
					console.log(props.x);
				};
			}
		};
	});
