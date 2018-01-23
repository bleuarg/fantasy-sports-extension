
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BabelEnginePlugin = require('babel-engine-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: './built/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!p\-map)/, //p-map i
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: ['lodash']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ],
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // }),
    // new UglifyJSPlugin(),
    new LodashModuleReplacementPlugin(),
    new BabelEnginePlugin({
      presets: ['env', 'react']
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'output'),
    compress: false,
    port: 8080
  }
};