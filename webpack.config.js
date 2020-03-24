/* eslint-disable semi */
const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PUG_TO_HTML_PATS = [
	{ output: 'index.html', input: './pug/pages/home/index.pug' },
	{ output: 'booking.html', input: './pug/pages/booking/booking.pug' },
	{ output: 'gallery.html', input: './pug/pages/gallery/gallery.pug' }
];

const babelOptions = (preset) => {
	const opts = {
		presets: [
			'@babel/preset-env'
		]
	}
	if (preset) {
		opts.presets.push(preset)
	}
	return opts
};
 
module.exports = {
	devtool: '#@cheap-module-eval-source-map',
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './javascript/index.ts']
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		port: 4200
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		...PUG_TO_HTML_PATS.map(item => {
			return new HTMLWebpackPlugin({
				filename: item.output,
				template: item.input
			});
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map'
		})
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: { path: './postcss.config.js' }
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
				  name: '[name].[ext]'
				},
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: { pretty: true }
			}, 
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: babelOptions()
					},
					// {
					// 	loader: 'eslint-loader',
					// 	options: {
					// 		sourceMap: true
					// 	}
					// }
				]
				
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				enforce: 'pre',
				use: [
					{
						loader: 'babel-loader',
						options: babelOptions('@babel/preset-typescript')
					},
					{
						loader: require.resolve('eslint-loader'),
						options: {
							eslintPath: require.resolve('eslint')
						}
					}
				]
			}
		]
	}
}