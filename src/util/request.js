import Cookies from 'js-cookie'

import { notify } from '../shell/store/notifications.js'

export function request(url, opts = {}) {
  if (!url) {
    throw new Error('A URL is required to make a request')
  }

  opts.headers = opts.headers || {}

  const token = Cookies.get(CONFIG.COOKIE_NAME)
  if (token) {
    opts.headers['Authorization'] = `Bearer ${token}`
  }

  if (!opts.method && opts.body) {
    opts.method = 'POST'
  }

  if (opts.body) {
    if (opts.json) {
      opts.headers['Content-Type'] = 'application/json'
      opts.body = JSON.stringify(opts.body)
    } else if (
      opts.headers &&
      opts.headers['Content-Type'] &&
      opts.headers['Content-Type'].includes('x-www-form-urlencoded')
    ) {
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

  // Do not allow cookie sessions
  opts.credentials = 'omit'
  opts.method = opts.method || 'GET'

  return fetch(encodeURI(url), opts)
    .then(res => {
      // Success
      if (res.status < 300) {
        try {
          return res.json()
        } catch (err) {
          notify({
            message: `We ran into an issue processing an API response. 200`,
            type: 'error'
          })
        }
      }

      // Request Denied
      if (res.status === 400) {
        try {
          // It's up to the request initiator to handle bad requests in a catch
          return res.json().then(function(json) {
            return Promise.reject(
              Object.assign({}, json, { status: res.status })
            )
          })
        } catch (err) {
          notify({
            message: `We ran into an issue processing an API response. 400`,
            type: 'error'
          })
        }
      }
      if (res.status === 401) {
        notify({
          message: `Unauthorized: Sign back in to continue`,
          type: 'error'
        })
      }
      if (res.status === 404) {
        notify({
          message: `We could not find a requested resource. 404`,
          type: 'error'
        })
      }
      if (res.status === 410) {
        notify({
          message: `Your two factor authentication has expired. 410`,
          type: 'error'
        })
      }
      if (res.status === 422) {
        try {
          return res.json()
        } catch (err) {
          notify({
            message: `We ran into an issue processing an API response. 422`,
            type: 'error'
          })
        }
      }

      // Server Failed
      if (res.status >= 500) {
        throw { res: res, opts: opts, url: url }
      }

      // If a result hasn't been returned yet return the response
      return res.json()
    })
    .then(json => {
      if (opts.callback) {
        opts.callback(json)
      }
      return json
    })
    .catch(err => {
      // It's up to the request initiator to handle bad requests in a catch
      if (err.status && err.status === 400) {
        return Promise.reject(err)
      }
      // TODO global app notification on total request failure
      Raven.captureException(err)
      bugsnagClient.notify(err, {
        beforeSend: function(report) {
          if (report.message === 'Invalid user') report.ignore
        }
      })
      throw err
    })
}
