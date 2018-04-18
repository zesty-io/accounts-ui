export function settings(state = {
    API_ACCOUNTS: 'http://accounts.api.zesty.localdev:3022/v1',
    API_INSTANCE: '.api.zesty.localdev:3023/v1/',
    API_AUTH: 'http://svc.zesty.localdev:3011',
    MANAGER_URL: '.manage.zesty.localdev:3020',
    MANAGER_URL_PROTOCOL: 'http://',
    PREVIEW_URL: '-dev.preview.zestyio.com/',
    PREVIEW_URL_PROTOCOL: 'http://',
    COOKIE_NAME: 'APP_SID',
    COOKIE_DOMAIN: '.zesty.localdev'
  }, action) {
  return state
}
