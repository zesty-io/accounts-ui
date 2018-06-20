#! /usr/bin/env node
// @see https://strongloop.com/strongblog/modular-node-js-express/
const fs = require('fs')
const path = require('path')
const copyFiles = require('./copyFiles')
const buildIndex = require('./buildIndex')
const buildConfig = require('./buildConfig')

const root = path.resolve(__dirname, '../')
copyFiles(root + '/public', root + '/build')

const env = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : ''

console.log('ENV: ', env)

fs.writeFileSync(
  path.resolve(process.cwd(), 'build/config.js'),
  buildConfig(env)
)

fs.writeFileSync(
  path.resolve(process.cwd(), 'build/index.html'),
  buildIndex(env)
)
