#! /usr/bin/env node
// @see https://strongloop.com/strongblog/modular-node-js-express/

const fs = require('fs')
const path = require('path')
const copyFiles = require('./copyFiles')
const runPkgCmd = require('./runPkgCmd')

const root = path.resolve(__dirname, '../')
const src = root + '/src'
const appDir = root + '/src/apps'

copyFiles(root + '/public', root + '/build')

fs.readdirSync(src)
  .forEach((dir) => {
      runPkgCmd(path.join(src, dir), 'start')
    })

fs.readdirSync(appDir)
  .forEach((app) => {
      runPkgCmd(path.join(appDir, app), 'start')
    })
