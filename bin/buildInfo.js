const fs = require('fs')
const path = require('path')
const package = require('../package.json')

const root = path.resolve(__dirname, '../')
const execSync = require('child_process').execSync

module.exports = async function buildInfo(env) {
  //create a buildInfo file
  const version = package.version
  const buildEngineer = await execSync('whoami')
    .toString()
    .trim(-2)
  const gitCommit = await execSync('git rev-parse --short HEAD')
    .toString()
    .trim(-2)
  const gitBranch = await execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim(-2)
  let gitState = await execSync('git status --porcelain 2>/dev/null')
    .toString()
    .trim(-2)
  gitState = gitState === '' ? 'clean' : 'dirty'

  const h = {
    _meta: {},
    data: {
      version: version,
      environment: env || 'env not set',
      gitCommit: gitCommit,
      gitBranch: gitBranch,
      buildEngineer: buildEngineer,
      gitState: gitState,
      buildTimeStamp: Date.now()
    },
    message: 'healthy'
  }

  fs.writeFileSync(`${root}/build/buildinfo.json`, JSON.stringify(h))

  return h
}
