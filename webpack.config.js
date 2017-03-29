'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Create multiple instances
// const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
// const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');

const env = new webpack.EnvironmentPlugin(['NODE_ENV'])
const extractSass = new ExtractTextPlugin({
    filename: "build/[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: './src/index.js',
  devtool: 'cheap-module-source-map',
  output: {
      filename: 'build/bundle.accounts-app.js'
  },
  plugins: [env, extractSass],
  module: {
    rules: [
      // {
      //   test: /\.scss$/,
      //   loader: extractSass.extract({
      //       use: [{
      //         loader: "css-loader"
      //       }, {
      //         loader: "sass-loader"
      //       }],
      //       // use style-loader in development
      //       fallback: "style-loader"
      //   })
      // },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
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
