'use strict'

const path = require('path')
const build = require('../../build/buildinfo.json')

module.exports = {
  entry: {
    vendors: './vendors.js',
    polyfills: './polyfills.js'
  },
  context: path.resolve(__dirname),
  mode: process.env.NODE_ENV || 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: `../../../build/bundle.${build.data.gitCommit}.[name].js`
  }
}
