'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require('../models/user');


router.get('/', function (req, res) {
	console.log(req.url);
	User.getUsers()
		.then(function (result) {
			res.ok(result);
		})
		.catch(function (err) {
			console.log(err);
			res.InternalServerError('Internal Server Error');
		});
});

router.get('/:userId', function (req, res) {
	User.getUser(req.params)
		.then(function (result) {
			res.ok(result);
		})
		.catch(function (err) {
			console.log(err);
			res.InternalServerError('Internal Server Error');
		});
});

router.patch('/:userId', function (req, res) {
	User.editUser(req.params, req.body)
		.then(function (result) {
			res.ok(result);
		})
		.catch(function (err) {
			console.log(err);
			res.InternalServerError('Internal Server Error');
		});
});

router.post('/', function (req, res) {
	User.createUser(req.body)
		.then(function (result) {
			res.ok(result);
		})
		.catch(function (err) {
			if (err.message.indexOf('violates unique constraint') > -1) { return res.ok({error: 'Username already exists.'}); }
			res.InternalServerError(err.message);
		});
});

router.delete('/:userId', function (req, res) {
	User.deleteUser(req.params)
		.then(function (result) {
			res.ok();
		})
		.catch(function (err) {
				console.log(err);
				res.InternalServerError('Internal Server Error');
		})
});

module.exports = router;
