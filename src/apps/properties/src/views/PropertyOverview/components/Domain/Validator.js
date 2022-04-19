export const urlFormatter = url => {
  let formatURL = url
  let validateURL = true

  if (url) {
    formatURL = url
      .trim()
      .toLowerCase()
      .replace(/(^\w+:|^)\/\//, '')
  }

  if (formatURL.includes('/')) {
    validateURL = formatURL.split('/')[0]

    validateURL = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
      validateURL
    )
  }

  // if (formatURL.includes('/')) {
  //   let splitURL = formatURL.split('/')
  //   if (splitURL.length > 2) {
  //     formatURL = splitURL[0] + '/' + splitURL[1]
  //   }
  // }

  // const validURL = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
  //   formatURL
  // )

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
