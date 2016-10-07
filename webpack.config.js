const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './index.ts',
  target: 'node',
  output: {
    path: './dist',
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  resolve: {
    modules: [path.join(__dirname, 'src')],
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['awesome-typescript-loader'] },
      { test: /\.(html|css)$/, loader: 'raw-loader' }
    ]
  }
}