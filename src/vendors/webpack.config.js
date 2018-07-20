'use strict'
const build = require('../../build/buildinfo.json')

module.exports = {
  entry: {
    vendors: './vendors.js',
    polyfills: './polyfills.js'
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: `../../build/bundle.${build.data.gitCommit}.[name].js`
  }
}
