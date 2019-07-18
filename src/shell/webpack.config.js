'use strict'

const build = require('../../build/buildinfo.json')
const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractLess = new ExtractTextPlugin({
  filename: `../../../build/bundle.${build.data.gitCommit}.shell.css`
})

module.exports = {
  entry: './index.js',
  context: path.resolve(__dirname),
  devtool: 'cheap-module-source-map',
  mode: process.env.NODE_ENV || 'development',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    redux: 'Redux',
    'redux-thunk': 'ReduxThunk'
  },
  output: {
    filename: `../../../build/bundle.${build.data.gitCommit}.shell.js`
  },
  plugins: [extractLess],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: extractLess.extract({
          use: [
            {
              loader: 'css-loader'
            }
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            // "@babel/plugin-syntax-dynamic-import",
            // "@babel/plugin-syntax-import-meta",
            ['@babel/plugin-proposal-class-properties', { loose: false }]
            // "@babel/plugin-proposal-json-strings"
          ]
        }
      }
    ]
  }
}
