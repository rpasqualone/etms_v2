'use strict';

var bcrypt = require('bcrypt');
var connection = require('../connections/postgres');
var _ = require('lodash');

module.exports = {
	getUsers: () => {
		return new Promise((resolve, reject) => {
			connection.then((client) => {
				client.query('SELECT * FROM users', (err, result) => {
					if (err) { return reject(err) }
					resolve(result.rows);
				});
			});
		});
	},

	getUser: (props) => {
		return new Promise((resolve, reject) => {
			connection.then((client) => {
				client.query(
					'SELECT * FROM users WHERE user_id = $1',
					[props.userId],
					(err, result) => {
						if (err) { return reject(err); }
						resolve(result.rows);
					}
				)
			});
		});
	},

	editUser: (props, params) => {
		return new Promise((resolve, reject) => {
			params = _.pick(params, ["user_name", "first_name", "last_name", "password"]);
			var i = 1;
			var query = ['UPDATE users', 'SET'];
			var set = [];
			var values = [];
			_.forOwn(params, (value, key) => {
				set.push(key + ' = ($' + i + ')');
				values.push(value);
				i++;
			});
			query.push(set.join(', '));
			query.push('WHERE user_id = ' + props.userId + ' RETURNING *');
			query = query.join(' ');
			connection.then((client) => {
				client.query(
					query,
					values,
					(err, result) => {
						if (err) { return reject(err); }
						resolve(result.rows[0]);
					}
				)
			});
		});
	},

	comparePassword: (props) => {
		return new Promise((resolve, reject) => {
			connection.then((client) => {
				client.query(
					'SELECT * FROM users WHERE user_name = $1',
					[props.userName],
					(err, result) => {
						if (err) { return reject(err); }
						if (!result.rows.length) { return resolve(false); }
						bcrypt.compare(props.password, result.rows[0].password_hash, (err, same) => {
							if (err) { return reject(err); }
							if (!same) { return resolve(false); }
							return resolve(result.rows[0]);
						});
					}
				)
			});
		})
	},

	createUser: (props) => {
		return new Promise((resolve, reject) => {
			bcrypt.hash(props.password, 10, (err, hash) => {
				if (err) { return; }
				connection.then((client) => {
					client.query(
						'INSERT INTO users (first_name, last_name, user_name, password_hash) VALUES($1, $2, $3, $4) RETURNING *',
						[props.first_name, props.last_name, props.user_name, hash],
						(err, result) => {
							if (err) { return reject(err); }
							resolve(result.rows[0]);
						});
				});
			});
		});
	},

	deleteUser: (props) => {
		return new Promise((resolve, reject) => {
			connection.then((client) => {
				client.query(
					'DELETE FROM users WHERE user_id = $1',
					[props.userId],
					(err, result) => {
						if (err) { return reject(err); }
						resolve(result);
					}
				)
			});
		});
	}
};
