
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const Jarvis = require('webpack-jarvis');

module.exports = {
  entry: './src/script.js',
  output: {
    filename: 'output/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ],
  },
  plugins: [
    //new UglifyJSPlugin(),
    new Jarvis({
      port: 1337 // optional: set a port
    })
  ]
};