'use strict';

import angular from 'angular';

export default angular.module('directives.header', [])
	.directive('header', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/header.html'
		};
	}).name;
