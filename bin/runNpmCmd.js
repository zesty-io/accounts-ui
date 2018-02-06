const cp = require('child_process')

module.exports = function runNpmCmd (dir, cmd) {
  cp.spawn('npm', ['run', cmd], {
    env: process.env,
    cwd: dir,
    stdio: 'inherit'
  })
}
