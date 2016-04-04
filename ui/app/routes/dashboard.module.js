import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routing from './dashboard';
import dashboard from './../directives/_shared/dashboard';

export default angular.module('app.dashboard', [uiRouter])
	.config(routing)
	.directive('dashboard', dashboard);
