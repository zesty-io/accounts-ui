'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const env = new webpack.EnvironmentPlugin(['NODE_ENV'])
const extractLess = new ExtractTextPlugin({
    filename: "build/bundle.accounts-app.css",
    disable: process.env.NODE_ENV === "development"
})

module.exports = {
  entry: './src/index.js',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'build/bundle.accounts-app.js'
  },
  plugins: [env, extractLess],
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
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      }
    ]
  }
}
