'use strict';

import angular from 'angular';

export default angular.module('directives.header', [])
	.directive('header', () => {
		return {
			restrict: 'E',
			templateUrl: 'templates/header.html',
			controller: ($scope) => {
				console.log($scope);
			},
			link: function (scope, element, attrs) {
				console.log(scope);
			}
			}
	});
