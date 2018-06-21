'use strict'

const build = require('../../build/buildinfo.json')
const webpack = require('webpack')

module.exports = {
  entry: './index.js',
  devtool: 'cheap-module-source-map',
  output: {
    filename: `../../build/bundle.${build.data.gitCommit}.vendors.js`
  }
}
