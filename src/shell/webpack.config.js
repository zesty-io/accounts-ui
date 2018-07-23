'use strict'

const build = require('../../build/buildinfo.json')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const env = new webpack.EnvironmentPlugin(['NODE_ENV'])
const extractLess = new ExtractTextPlugin({
  filename: `../../build/bundle.${build.data.gitCommit}.shell.css`
})

module.exports = {
  entry: './index.js',
  devtool: 'cheap-module-source-map',
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
    filename: `../../build/bundle.${build.data.gitCommit}.shell.js`
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx']
  },
  plugins: [env, extractLess],
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
          presets: ['react', 'es2015', 'stage-2']
        }
      }
    ]
  }
}
