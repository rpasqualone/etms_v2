import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routing from './usersTable';
import usersTable from './../directives/_shared/usersTable';

export default angular.module('app.usersTable', [uiRouter])
	.config(routing)
	.directive('usersTable', usersTable);
