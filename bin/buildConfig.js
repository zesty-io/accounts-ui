#! /usr/bin/env node

const fs = require('fs')
const path = require('path')

module.exports = buildConfig = build => {
  let config = {}
  if (build.data.environment.toUpperCase() === 'PRODUCTION') {
    config = {
      ENV: 'production',
      API_ACCOUNTS: 'https://accounts.api.zesty.io/v1',
      API_INSTANCE: '.api.zesty.io/v1/',
      API_AUTH: 'https://auth.api.zesty.io',
      MANAGER_URL: '.manage.zesty.io',
      MANAGER_URL_PROTOCOL: 'https://',
      PREVIEW_URL: '-dev.preview.zestyio.com',
      PREVIEW_URL_PROTOCOL: 'https://',
      COOKIE_NAME: 'APP_SID',
      COOKIE_DOMAIN: '.zesty.io',
      EMAIL_SERVICE: 'https://email.zesty.io/send',
      C_NAME: 'zesty.map.fastly.net',
      A_RECORDS: [
        '151.101.1.161',
        '151.101.65.161',
        '151.101.129.161',
        '151.101.193.161'
      ]
    }
  } else if (build.data.environment.toUpperCase() === 'STAGE') {
    config = {
      API_ACCOUNTS: 'https://accounts.api.stage.zesty.io/v1',
      API_INSTANCE: '.api.stage.zesty.io/v1/',
      API_AUTH: 'https://auth.api.stage.zesty.io',
      MANAGER_URL: '.stage-manage.zesty.io',
      MANAGER_URL_PROTOCOL: 'https://',
      PREVIEW_URL: '-dev.stage-preview.zestyio.com',
      PREVIEW_URL_PROTOCOL: 'https://',
      COOKIE_NAME: 'STAGE_APP_SID',
      COOKIE_DOMAIN: '.zesty.io',
      EMAIL_SERVICE: 'https://email.zesty.io/send',
      C_NAME: 'zesty.map.fastly.net',
      A_RECORDS: [
        '151.101.1.161',
        '151.101.65.161',
        '151.101.129.161',
        '151.101.193.161'
      ]
    }
  } else {
    config = {
      API_ACCOUNTS: 'http://accounts.api.zesty.localdev:3022/v1',
      API_INSTANCE: '.api.zesty.localdev:3023/v1/',
      API_AUTH: 'http://auth.api.zesty.localdev:3011',
      MANAGER_URL: '.manage.zesty.localdev:3017',
      MANAGER_URL_PROTOCOL: 'http://',
      PREVIEW_URL: '-dev.preview.zestyio.localdev:3016',
      PREVIEW_URL_PROTOCOL: 'http://',
      COOKIE_NAME: 'DEV_APP_SID',
      COOKIE_DOMAIN: '.zesty.localdev',
      C_NAME: 'zesty.map.fastly.net',
      A_RECORDS: [
        '151.101.1.161',
        '151.101.65.161',
        '151.101.129.161',
        '151.101.193.161'
      ]
    }
  }

  fs.writeFileSync(
    path.resolve(process.cwd(), `build/config.${build.data.gitCommit}.js`),
    `window.CONFIG = ${JSON.stringify(config)}`
  )

  return config
}
