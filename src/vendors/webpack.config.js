'use strict'

const webpack = require('webpack')

module.exports = {
  entry: './index.js',
  devtool: 'cheap-module-source-map',
  output: {
    filename: '../../build/bundle.vendors.js'
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /(node_modules)/,
  //       loader: 'babel-loader',
  //       query: {
  //         presets: ['react', 'es2015', 'stage-2']
  //       }
  //     }
  //   ]
  // }
}
