angular.module('app.header', [])
	.directive('header', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/header.html',
			replace: true,
			controller: function ($scope) {
				console.log('test!');
			}
		};
	});
