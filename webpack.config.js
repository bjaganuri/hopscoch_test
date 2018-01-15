const path = require('path');
const webpack = require('webpack');
const WebpackBuildNotifier = require('webpack-build-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HandlebarsPlugin = require("handlebars-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';

const extractPlugin = new ExtractTextPlugin({
	filename: 'css/[name].bundle.css'
});

const SOURCE_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  devtool: isProduction ? 'hidden-source-map' : 'inline-source-map',
  entry: [
	'babel-polyfill',	
    SOURCE_PATH+'/app/js/index'
  ],
  output: {
    path: DIST_PATH,
    filename: 'js/[name].bundle.js',
	publicPath: ASSET_PATH
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['es2015', {modules: false}], 'react', 'stage-3']
            }
          }
        ]
      },
	  {
		test: /\.css?$/,
		use: extractPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader']
		})
	 },
	 {
		test: /\.(png|woff|woff2|eot|ttf|svg)$/,
		use: [
			  {
				  loader: 'url-loader',
				  options: {
					  name: 'css/[name].[ext]',
					  limit: 100000
				  }
			  }
		]
	 }
    ]
  },
  resolve : {
    extensions: ['.js', '.json', '.jsx'],
    modules: ['node_modules'/* add additional folders right here */]
  },
  plugins: [
    new WebpackBuildNotifier(),
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery"
	}),
	extractPlugin,
	 new HandlebarsPlugin({
		entry: path.join(SOURCE_PATH, "templates", "*.hbs"),
		output: path.join(DIST_PATH, "[name].html")
	})
  ]
};
