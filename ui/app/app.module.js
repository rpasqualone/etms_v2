'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './app.config';

import header from './directives/_shared/header';
import nav from './directives/_shared/nav';
import usersTable from './routes/usersTable.module.js'
import dashboard from './routes/dashboard.module.js'

export default angular.module('app', [
	uiRouter,
	dashboard.name,
	usersTable.name,
	header.name,
	nav.name
]).config(routing);
