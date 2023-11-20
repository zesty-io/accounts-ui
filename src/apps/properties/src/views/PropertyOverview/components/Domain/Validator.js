export const urlFormatter = url => {
  let formatURL = url
  let validateURL = true

  if (url) {
    formatURL = url
      .trim()
      .toLowerCase()
      .replace(/(^\w+:|^)\/\//, '')
  }

  if (formatURL) {
    // validate TLD
    validateURL = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
      formatURL
    )
  }

  if (formatURL.includes('/')) {
    // split at first "/"
    validateURL = formatURL.split('/')[0]

    // validate TLD
    validateURL = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
      validateURL
    )
  }

  if (validateURL) {
    return {
      value: formatURL,
      error: null
    }
  } else {
    return {
      value: formatURL,
      error: 'Invalid domain extension'
    }
  }
}
