#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const os = require('os')

module.exports = function runCmd(dir, cmd) {
  console.log(`RUN: ${cmd}:${dir}`)

  // ensure dir has package.json
  if (!fs.existsSync(path.join(dir, 'package.json'))) {
    console.log(`Missing: ${dir}/package.json`)
    return
  }

  const options = {
    env: process.env,
    cwd: dir,
    stdio: 'inherit'
  }

  if (os.platform() === 'win32') {
    options.shell = true
  }

  cp.spawn('npm', ['run', cmd], options)
}
