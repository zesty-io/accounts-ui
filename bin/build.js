#! /usr/bin/env node
const cp = require('child_process')
const fs = require('fs')
const path = require('path')
const src = path.resolve(__dirname, '../')

const copyFiles = (from, to) => {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to)
  }
  fs.readdir(from, (err, files) => {
    if (!err) {
      files.forEach(file => {
        const is = fs.createReadStream(from + '/' + file)
        const os = fs.createWriteStream(to + '/' + file)
        is.pipe(os)
      })
    } else {
      throw err
    }
  })
}

copyFiles(src + '/public', src + '/build')

cp.spawn('npm', ['run', 'build:prod'], {
  env: process.env,
  cwd: src,
  stdio: 'inherit'
})
