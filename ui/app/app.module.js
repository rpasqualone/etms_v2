'use strict';

import angular from 'angular';
import header from './directives/_shared/header';
import nav from './directives/_shared/nav';

export default angular.module('app', [
    header.name,
    nav.name
]);
