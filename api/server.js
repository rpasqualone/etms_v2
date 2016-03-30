'use strict';

var config = require('./src/services/config');
var express = require('express');
var expressJWT = require('express-jwt');
var app = express();

app.use(function (err, req, res, next) {
	console.log(err);
});

//app.use(expressJWT({secret: config.secret}).unless({path: ['/sessions', '/users']}));

app.use(require('http-responses'));
app.use(require('body-parser').json());

app.use('/users', require('./src/controllers/user'));
app.use('/sessions', require('./src/controllers/session'));

app.listen(config.port);
