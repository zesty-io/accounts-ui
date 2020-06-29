#! /usr/bin/env node
// @see https://strongloop.com/strongblog/modular-node-js-express/

const fs = require('fs')
const path = require('path')
const ncp = require('ncp')
const runCmd = require('./runCmd')
const buildInfo = require('./buildInfo')
const buildIndex = require('./buildIndex')
const buildConfig = require('./buildConfig')

const env = process.env.NODE_ENV.toLowerCase() || 'development'
const root = path.resolve(__dirname, '../')
const src = root + '/src/'
const apps = root + '/src/apps/'
;(async function build() {
  const build = await buildInfo(env)
  buildConfig(build)
  buildIndex(build)
  let running = false

  ncp(`${root}/public`, `${root}/build`, function(err) {
    if (err) {
      console.log(err)
      throw err
    } else {
      if (!running) {
        running = true
        console.log('BUILD:NCP:done')

        fs.readdirSync(src).forEach(dir => {
          runCmd(path.join(src, dir), `build-${env}`)
        })

        fs.readdirSync(apps).forEach(app => {
          runCmd(path.join(apps, app), `build-${env}`)
        })
      }
    }
  })
})()
