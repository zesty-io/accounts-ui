'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractLess = new ExtractTextPlugin({
  filename: '../../build/bundle.core.css',
  disable: process.env.NODE_ENV === 'development'
})

module.exports = {
  entry: './index.js',
  devtool: 'cheap-module-source-map',
  externals: {
    'react': 'React'
  },
  output: {
    filename: '../../build/bundle.core.js'
  },
  plugins: [extractLess],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]'
            }
          }, {
            loader: 'less-loader'
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-2']
          }
        }
      }
    ]
  }
}
