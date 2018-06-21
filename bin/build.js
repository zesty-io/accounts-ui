#! /usr/bin/env node
// @see https://strongloop.com/strongblog/modular-node-js-express/

const fs = require('fs')
const path = require('path')
const copyFiles = require('./copyFiles')
const runCmd = require('./runCmd')
const buildInfo = require('./buildInfo')
const buildIndex = require('./buildIndex')
const buildConfig = require('./buildConfig')

const env = process.env.NODE_ENV.toLowerCase() || 'development'
const root = path.resolve(__dirname, '../')
const src = root + '/src/'
const apps = root + '/src/apps/'

copyFiles(root + '/public', root + '/build')
buildInfo()
buildConfig(env)
buildIndex(env)

fs.readdirSync(src).forEach(dir => {
  runCmd(path.join(src, dir), `build-${env}`)
})

fs.readdirSync(apps).forEach(app => {
  runCmd(path.join(apps, app), `build-${env}`)
})
