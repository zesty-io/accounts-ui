#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const cp = require('child_process')

module.exports = function runCmd(dir, cmd) {
  console.log(`RUN: ${cmd}:${dir}`)

  // ensure dir has package.json
  if (!fs.existsSync(path.join(dir, 'package.json'))) {
    console.log(`Missing: ${dir}/package.json`)
    return
  }

  cp.spawn('npm', ['run', cmd], {
    env: process.env,
    cwd: dir,
    stdio: 'inherit'
  })
}
