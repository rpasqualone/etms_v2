'use strict';

var config = require('../services/config');
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
	User.comparePassword(req.body)
		.then((result) => {
			if (!result) { return res.ok(result); }
			//var token = jwt.sign(result, config.secret);
			return res.ok(result);
			//return res.ok(token);
		})
		.catch((err) => {
			res.InternalServerError(err.message);
		});
});

module.exports = router;
