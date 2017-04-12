'use strict';

const webpack = require('webpack')
const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

module.exports = {
	target: 'electron',
	devtool: isProd ? 'source-map' : 'cheap-eval-source-map',
	context: __dirname + '/src',
	module: {
		loaders: [{
			test: /.js?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['react'],
        plugins: [
          // used to comply to babel-preset-react-app
          require('babel-plugin-transform-class-properties'),
          // used to comply to babel-preset-react-app
          require('babel-plugin-transform-object-rest-spread'),
        ]
			}
		}]
	},
	entry: './index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'retro.js'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(nodeEnv)
			}
		}),
		// new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.LoaderOptionsPlugin({
			debug: true,
			minimize: true
		})
	]
}
