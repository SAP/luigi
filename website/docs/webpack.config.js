const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const sveltePreprocess = require('svelte-preprocess');

const preprocess = sveltePreprocess({
  // postcss: true,
});

const config = require('sapper/config/webpack.js');
const pkg = require('./package.json');
const commonRules = require('./webpack-common-rules');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const alias = { svelte: path.resolve('node_modules', 'svelte') };
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];

module.exports = {
	client: {
		entry: config.client.entry(),
		output: config.client.output(),
		resolve: { alias, extensions, mainFields },
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							dev,
							hydratable: true,
							hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
							preprocess
						}
					}
				},
				commonRules.babel,
				commonRules.css,
				commonRules.urls
			]
		},
		mode,
		plugins: [
			// pending https://github.com/sveltejs/svelte/issues/2377
			// dev && new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css'
			}),
			// new CleanWebpackPlugin(['public'], {
			// 	exclude: [],
			// 	verbose: true
			// }),
		].filter(Boolean),
		devtool: dev && 'inline-source-map',
		stats: {
			warnings: false
		}
	},

	server: {
		entry: config.server.entry(),
		output: config.server.output(),
		target: 'node',
		resolve: { alias, extensions, mainFields },
		externals: Object.keys(pkg.dependencies).concat('encoding'),
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							css: false,
							generate: 'ssr',
							dev,
							preprocess
						}
					}
				},
				commonRules.babel,
				commonRules.css,
				commonRules.urls
			]
		},
		mode: process.env.NODE_ENV,
		performance: {
			hints: false // it doesn't matter if server.js is large
		}
	},

	serviceworker: {
		entry: config.serviceworker.entry(),
		output: config.serviceworker.output(),
		mode: process.env.NODE_ENV
	}
};
