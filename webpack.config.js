const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const _ = require('lodash')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const VersionPlugin = require('./webpack.version.js')
const pckg = require('./package.json')
const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

var plugins = [

	new HappyPack({
		id: 'js',
		verbose: false,
		threads: 4,
		loaders: [
			'babel-loader',
			{
				loader: 'eslint-loader',
				options: {
					configFile: './.eslintrc',
				}
			}
		]
	}),
	
	new HappyPack({
		id: 'styles',
		verbose: false,
		threads: 2,
		loaders: ['style-loader', 'raw-loader', 'sass-loader']
	}),

	new HappyPack({
		id: 'modules',
		verbose: false,
		threads: 2,
		loaders: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					modules: true,
					localIdentName: '[name]--[local]--[hash:base64:8]',
					importLoaders: 2
				}
			},
			'postcss-loader',
			'sass-loader',
			{
				loader: 'sass-resources-loader',
				options: {
					resources: './src/styles/core.scss'
				}
			}
		]
	}),

	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify(nodeEnv)
		}
	}),

	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: Infinity,
		filename: 'vendor.bundle.js'
	}),

	new webpack.NamedModulesPlugin(),
	new VersionPlugin({ ver: pckg.version }),
	new ProgressBarPlugin()
]

if( isProd ) plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}))

const entry = isProd ? ['babel-polyfill', './src/index.js'] : [
	'react-hot-loader/patch', 
	'webpack-hot-middleware/client',
	'webpack/hot/only-dev-server',
	'babel-polyfill',
	'./src/index.js'
]

const modulePaths = {
	components: 'src/components',
	configs: 'src/configs',
	containers: 'src/containers',
	helpers: 'src/helpers',
	modules: 'src/modules',
	selectors: 'src/selectors',
	routes: 'src/routes',
	store: 'src/store',
	styles: 'src/styles',
}

const stylePaths = [
	/\.global/, 
	/bulma/, 
	/react-virtualized/, 
	__dirname + '/src/styles'
]

module.exports = {

	devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',

	entry: {
		entry: entry,

		vendor: [
			'axios',
			'classnames',
			'history',
			'moment',
			'react',
			'react-dom',
			'react-loader-advanced',
			'react-redux',
			'react-router',
			'react-router-redux',
			'redux',
			'redux-form',
			'redux-persist',
			'redux-thunk',
			'reselect'
		]
	},

	output: {
		path: path.join(__dirname, 'static'),
		filename: 'bundle.js',
		publicPath: '/'
	},

	resolve: {
		extensions: ['.js', '.scss', '.less'],
		alias: _.mapValues(modulePaths, (str) => path.join(process.cwd(), ...str.split('/')))
	},

	plugins: plugins,

	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			include: __dirname,
			exclude: /node_modules/,
			use: ['happypack/loader?id=js']
		}, {
			test: /\.(css|scss|sass)$/,
			exclude: stylePaths,
			use: ['happypack/loader?id=modules']
		}, {
			test: /\.(css|scss|sass)$/,
			include: stylePaths,
			use: ['happypack/loader?id=styles']
		}]
	}
}

