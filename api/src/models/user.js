'use strict';

var bcrypt = require('bcrypt');
var connection = require('../connections/postgres');
var _ = require('lodash');

module.exports = {
	getUsers: function () {
		return new Promise(function(resolve, reject) {
			connection.then(function (client) {
				client.query('SELECT * FROM users', function (err, result) {
					if (err) { return reject(err) }
					resolve(result.rows);
				});
			});
		});
	},

	getUser: function (props) {
		return new Promise(function (resolve, reject) {
			connection.then(function (client) {
				client.query(
					'SELECT * FROM users WHERE user_id = $1',
					[props.userId],
					function (err, result) {
						if (err) { return reject(err); }
						resolve(result.rows);
					}
				)
			});
		});
	},

	editUser: function (props, params) {
		return new Promise(function (resolve, reject) {
			params = _.pick(params, ["user_name", "first_name", "last_name", "password"]);
			var i = 1;
			var query = ['UPDATE users', 'SET'];
			var set = [];
			var values = [];
			_.forOwn(params, function (value, key) {
				set.push(key + ' = ($' + i + ')');
				values.push(value);
				i++;
			});
			query.push(set.join(', '));
			query.push('WHERE user_id = ' + props.userId + ' RETURNING *');
			query = query.join(' ');
			connection.then(function (client) {
				client.query(
					query,
					values,
					function (err, result) {
						if (err) { return reject(err); }
						resolve(result.rows[0]);
					}
				)
			});
		});
	},

	comparePassword: function (props) {
		return new Promise(function (resolve, reject) {
			connection.then(function (client) {
				client.query(
					'SELECT * FROM users WHERE user_name = $1',
					[props.userName],
					function (err, result) {
						if (err) { return reject(err); }
						if (!result.rows.length) { return resolve(false); }
						bcrypt.compare(props.password, result.rows[0].password_hash, function (err, same) {
							if (err) { return reject(err); }
							if (!same) { return resolve(false); }
							return resolve(result.rows[0]);
						});
					}
				)
			});
		})
	},

	createUser: function (props) {
		return new Promise(function(resolve, reject) {
			bcrypt.hash(props.password, 10, function(err, hash) {
				if (err) { return; }
				connection.then(function (client) {
					client.query(
						'INSERT INTO users (first_name, last_name, user_name, password_hash) VALUES($1, $2, $3, $4) RETURNING *',
						[props.first_name, props.last_name, props.user_name, hash],
						function (err, result) {
							if (err) { return reject(err); }
							resolve(result.rows[0]);
						});
				});
			});
		});
	},

	deleteUser: function (props) {
		return new Promise(function(resolve, reject) {
			connection.then(function (client) {
				client.query(
					'DELETE FROM users WHERE user_id = $1',
					[props.userId],
					function (err, result) {
						if (err) { return reject(err); }
						resolve(result);
					}
				)
			});
		});
	}
};
