'use strict';

import './../assets/css/master.css';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import uiRouter from 'angular-ui-router';
import routing from './app.config';

import header from './directives/_shared/header';
import nav from './directives/_shared/nav';
import sideBar from './directives/_shared/sideBar';
import usersTable from './routes/usersTable.module.js'
import dashboard from './routes/dashboard.module.js'

export default angular.module('app', [
	uiRouter,
	ngAnimate,
	dashboard.name,
	usersTable.name,
	header.name,
	nav.name,
	sideBar.name
]).config(routing);
