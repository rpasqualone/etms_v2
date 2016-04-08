'use strict';

var webpack = require('webpack');

module.exports = {
	context: __dirname + '/app',
	entry: {
		app: ['webpack/hot/dev-server', './app.module.js']
	},
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js',
		publicPath: 'http://localhost:3000/'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style!css!'
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel?presets[]=es2015'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};
