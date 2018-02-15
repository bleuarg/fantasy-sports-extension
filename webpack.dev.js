const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 9000,
    open: true
  }
});