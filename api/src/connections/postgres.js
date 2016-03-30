'use strict';

var config = require('../services/config');
var pg = require('pg');

module.exports = new Promise(function (resolve) {
	var client = new pg.Client(config.postgres);
	client.connect(function (err) {
		if (err) { throw err; }
		resolve(client);
	});
});
