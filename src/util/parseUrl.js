// takes a url and returns false or an object of the key value pairs from the query string
export function parseUrl(url) {
  if (typeof url !== 'string') {
    console.error(`Cannot parse url of type ${typeof url}`)
    return false
  }
  if (url.split('?').length === 1) {
    return false
  }
  const query = url.substr(url.indexOf('?') + 1)
  const keyValue = query.split('&').map(kvPair => {
    return { [kvPair.split('=')[0]]: kvPair.split('=')[1] }
  })
  return Object.assign({}, ...keyValue)
}

// takes a url and returns a string with the query params (for react router)
export function rawQS(url) {
  if (typeof url !== 'string') {
    return ''
  }
  return url.substr(url.indexOf('?') + 1)
}
