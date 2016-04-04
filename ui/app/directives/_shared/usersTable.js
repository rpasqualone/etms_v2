import angular from 'angular';

export default angular.module('directives.usersTale', [])
	.directive('usersTable', () => {
		return {
			restrict: 'E',
			templateUrl: 'templates/usersTable.html',
			replace: true,
			controller: ($scope) => {
				$scope.elements = [1,2,3];

				$scope.linkClicked = (index) => {
					console.log(index);
				};
			}
		};
	});
