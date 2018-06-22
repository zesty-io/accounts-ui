#! /usr/bin/env node
// @see https://strongloop.com/strongblog/modular-node-js-express/

const fs = require('fs')
const path = require('path')
const runCmd = require('./runCmd')

const root = path.resolve(__dirname, '../')
const src = root + '/src'
const apps = root + '/src/apps'

fs.readdirSync(src).forEach(dir => {
  runCmd(path.join(src, dir), 'start')
})

fs.readdirSync(apps).forEach(app => {
  runCmd(path.join(apps, app), 'start')
})
