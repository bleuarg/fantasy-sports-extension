
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const Jarvis = require('webpack-jarvis');

module.exports = {
  entry: './src/script.js',
  output: {
    filename: 'output/bundle.js'
  },
  plugins: [
    //new UglifyJSPlugin(),
    new Jarvis({
      port: 1337 // optional: set a port
    })
  ]
};