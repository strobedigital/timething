var webpack = require('webpack');
var bourbon = require('node-bourbon');

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: __dirname + '/src/',
    filename: 'bundle.js',
    publicPath: '/src/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ },
      { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&includePaths[]=" + bourbon.includePaths, exclude: /node_modules/ },
    ]
  }
};