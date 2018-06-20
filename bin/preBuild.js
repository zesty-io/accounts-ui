#! /usr/bin/env node
// @see https://strongloop.com/strongblog/modular-node-js-express/
const fs = require('fs')
const path = require('path')
const copyFiles = require('./copyFiles')
const buildIndex = require('./buildIndex')
const buildConfig = require('./buildConfig')

const root = path.resolve(__dirname, '../')
copyFiles(root + '/public', root + '/build')

const env = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : ''

const handler = () => {
  const definedHandler = process.env.BUG_HANDLER
  console.log(definedHandler)
  const handlers = {
    raven: function() {
      return `<script>
      Raven.config('https://12c3a25b9d4c4442aa93f22dcf39c26a@sentry.io/1229171', {
        release: '0-0-0',
        environment: '${env}',
      }).install()
    </script>`
    },
    bugsnag: function() {
      return ``
    },
    default: function() {
      return '<!-- no bug reporting specified -->'
    }
  }
  return (handlers[definedHandler] || handlers['default'])()
}

console.log('ENV: ', env)

fs.writeFileSync(
  path.resolve(process.cwd(), 'build/config.js'),
  buildConfig(env)
)

fs.writeFileSync(
  path.resolve(process.cwd(), 'build/index.html'),
  buildIndex(env, handler())
)
