#! /usr/bin/env node
// @see https://strongloop.com/strongblog/modular-node-js-express/
const fs = require('fs')
const path = require('path')
const copyFiles = require('./copyFiles')

const root = path.resolve(__dirname, '../')
copyFiles(root + '/public', root + '/build')

let config = {}
const env = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : ''

console.log('ENV: ', env)

if (env === 'PRODUCTION') {
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
} else if (env === 'STAGE') {
  config = `window.CONFIG = {
    API_ACCOUNTS: 'https://accounts.stage-api.zesty.io/v1',
    API_INSTANCE: '.stage-api.zesty.io/v1/',
    API_AUTH: 'https://stage-svc.zesty.io/auth',
    MANAGER_URL: '.stage-manage.zesty.io',
    MANAGER_URL_PROTOCOL: 'https://',
    PREVIEW_URL: '-dev.stage-preview.zestyio.com',
    PREVIEW_URL_PROTOCOL: 'https://',
    COOKIE_NAME: 'STAGE_APP_SID',
    COOKIE_DOMAIN: '.zesty.io',
    EMAIL_SERVICE: 'https://email.zesty.io/send'
  }`
} else {
  config = `window.CONFIG = {
    API_ACCOUNTS: 'http://accounts.api.zesty.localdev:3022/v1',
    API_INSTANCE: '.api.zesty.localdev:3023/v1/',
    API_AUTH: 'http://svc.zesty.localdev:3011/auth',
    MANAGER_URL: '.manage.zesty.localdev:3020',
    MANAGER_URL_PROTOCOL: 'http://',
    PREVIEW_URL: '-dev.preview.zestyio.localdev:3020',
    PREVIEW_URL_PROTOCOL: 'http://',
    COOKIE_NAME: 'DEV_APP_SID',
    COOKIE_DOMAIN: '.zesty.localdev'
  }`
}

fs.writeFileSync(path.resolve(process.cwd(), 'build/config.js'), config)
