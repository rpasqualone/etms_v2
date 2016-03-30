'use strict';

var config = require('../services/config');
var pg = require('pg');

module.exports = new Promise((resolve) => {
	var client = new pg.Client(config.postgres);
	client.connect((err) => {
		if (err) { throw err; }
		resolve(client);
	});
});
