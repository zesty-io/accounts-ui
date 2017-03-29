'use strict'

var webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'build/bundle.accounts-app.js'
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV'])
    ],
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader',
              query: {
                presets: ['es2015', 'react']
              }
            }
        ]
    }
}
