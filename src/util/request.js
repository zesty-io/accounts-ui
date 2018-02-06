export function request (url, opts = {}) {
  if (!url) {
    throw new Error('A URL is required to make a request')
  }

  opts.headers = opts.headers || {}
  // opts.headers['X-Auth'] = readCookie(AUTH_SERVICE_COOKIE_NAME)

  if (!opts.method && opts.body) {
    opts.method = 'POST'
  }

  if (opts.body) {
    if (opts.json) {
      opts.headers['Content-Type'] = 'application/json'
      opts.body = JSON.stringify(opts.body)
    } else if (opts.headers && opts.headers['Content-Type'] && opts.headers['Content-Type'].includes('x-www-form-urlencoded')) {
      // do nothing?
      console.log('x-www-form-urlencoded')
    } else {
      let formData = new FormData()
      // TODO: Add header support

      for (var key in opts.body) {
        if (opts.body.hasOwnProperty(key)) {
          formData.append(key, opts.body[key])
        }
      }

      opts.body = formData
    }
  }

    // Default to authenticated requests
  opts.credentials = opts.credentials || 'include'
  opts.method = opts.method || 'GET'

  return fetch(url, opts)
  .then(res => res.json())
  .then(json => {
    if (opts.callback) {
      opts.callback(json)
    }

    if (json.code > 400) {
      console.log(json)
      // TODO trigger global app notification
    }

    return json
  })
  .catch(err => {
    console.error(err)
    // TODO global app notification on total request failure
    // throw err
  })
}
