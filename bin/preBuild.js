#! /usr/bin/env node
// @see https://strongloop.com/strongblog/modular-node-js-express/
const fs = require('fs')
const path = require('path')
const copyFiles = require('./copyFiles')

const root = path.resolve(__dirname, '../')
copyFiles(root + '/public', root + '/build')

let config = {}
const env = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : ''

if (env === 'production') {
  config = `window.CONFIG = {
    ENV: 'production',
    API_ACCOUNTS: 'https://accounts.api.zesty.io/v1',
    API_INSTANCE: '.api.zesty.io/v1/',
    API_AUTH: 'https://svc.zesty.io/auth',
    MANAGER_URL: '.manage.zesty.io',
    MANAGER_URL_PROTOCOL: 'https://',
    PREVIEW_URL: '-dev.preview.zestyio.com',
    PREVIEW_URL_PROTOCOL: 'https://',
    COOKIE_NAME: 'APP_SID',
    COOKIE_DOMAIN: '.zesty.io'
  }`
} else if (env === 'stage') {
  throw new Error(
    'zesty stage is not configured. use production or development'
  )
  // config = {
  //   API_ACCOUNTS: 'https://accounts.api.stage-zesty.io/v1',
  //   API_INSTANCE: '.api.stage-zesty.io/v1/',
  //   API_AUTH: 'https://svc.stage-zesty.io/auth',
  //   MANAGER_URL: '.manage.stage-zesty.io',
  //   MANAGER_URL_PROTOCOL: 'https://',
  //   PREVIEW_URL: '-dev.preview.stage-zesty.io',
  //   PREVIEW_URL_PROTOCOL: 'https://',
  //   COOKIE_NAME: 'STAGE_APP_SID',
  //   COOKIE_DOMAIN: '.stage-zesty.io',
  //   EMAIL_SERVICE: 'https://email.zesty.io/send'
  // }
} else {
  config = `window.CONFIG = {
    API_ACCOUNTS: 'http://accounts.api.zesty.localdev:3022/v1',
    API_INSTANCE: '.api.zesty.localdev:3023/v1/',
    API_AUTH: 'http://svc.zesty.localdev:3011/auth',
    MANAGER_URL: '.manage.zesty.localdev:3020',
    MANAGER_URL_PROTOCOL: 'http://',
    PREVIEW_URL: '-dev.preview.zestyio.localdev:3020',
    PREVIEW_URL_PROTOCOL: 'http://',
    COOKIE_NAME: 'APP_SID',
    COOKIE_DOMAIN: '.zesty.localdev'
  }`
}

fs.writeFileSync(path.resolve(process.cwd(), 'build/config.js'), config)
