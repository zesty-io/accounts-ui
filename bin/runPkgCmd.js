const fs = require('fs')
const path = require('path')
const runNpmCmd = require('./runNpmCmd')

module.exports = function runPkgCmd(dir, cmd) {
  // ensure dir has package.json
  if (!fs.existsSync(path.join(dir, 'package.json'))) {
    return
  }

  console.log(`RUN: ${cmd}:${dir}`)

  runNpmCmd(dir, cmd)
}
