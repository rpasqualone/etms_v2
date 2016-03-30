'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require('../models/user');


router.get('/', (req, res) => {
	User.getUsers()
		.then((result) => {
			res.ok(result);
		})
		.catch((err) => {
			console.log(err);
			res.InternalServerError('Internal Server Error');
		});
});

router.get('/:userId', (req, res) => {
	User.getUser(req.params)
		.then((result) => {
			res.ok(result);
		})
		.catch((err) => {
			console.log(err);
			res.InternalServerError('Internal Server Error');
		});
});

router.patch('/:userId', (req, res) => {
	User.editUser(req.params, req.body)
		.then((result) => {
			res.ok(result);
		})
		.catch((err) => {
			console.log(err);
			res.InternalServerError('Internal Server Error');
		});
});

router.post('/', (req, res) => {
	User.createUser(req.body)
		.then((result) => {
			res.ok(result);
		})
		.catch((err) => {
			if (err.message.indexOf('violates unique constraint') > -1) { return res.ok({error: 'Username already exists.'}); }
			res.InternalServerError(err.message);
		});
});

router.delete('/:userId', (req, res) => {
	User.deleteUser(req.params)
		.then((result) => {
			res.ok();
		})
		.catch((err) => {
				console.log(err);
				res.InternalServerError('Internal Server Error');
		})
});

module.exports = router;
