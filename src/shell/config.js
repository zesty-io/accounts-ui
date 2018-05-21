import stage from './config.stage'
import prod from './config.prod'

let loadConfig = {}

if (process.env.NODE_ENV == 'production') {
  loadConfig = prod
} else if (process.env.NODE_ENV == 'staging') {
  loadConfig = stage
} else {
  loadConfig = {
    API_ACCOUNTS: 'http://accounts.api.zesty.localdev:3022/v1',
    API_INSTANCE: '.api.zesty.localdev:3023/v1/',
    API_AUTH: 'http://svc.zesty.localdev:3011/auth',
    MANAGER_URL: '.manage.zesty.localdev:3020',
    MANAGER_URL_PROTOCOL: 'http://',
    PREVIEW_URL: '-dev.preview.zestyio.localdev:3020',
    PREVIEW_URL_PROTOCOL: 'http://',
    COOKIE_NAME: 'APP_SID',
    COOKIE_DOMAIN: '.zesty.localdev',
    EMAIL_SERVICE: 'https://send-email-dot-zesty-dev.appspot.com/send'
  }
}

export default loadConfig
