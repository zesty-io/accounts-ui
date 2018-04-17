// takes a url and returns false or an object of the key value pairs from the query string
export function parseUrl(url) {
  if (typeof url !== "string") {
    console.error(`Cannot parse url of type ${typeof url}`);
    return false
  }
  if(url.split("?").length === 1){
    // console.log(`No query params are present`);
    return false
  }
  const noUrl = url.split("?")[1]
  const keyValue = noUrl.split('&').map(kvPair => {
    return { [kvPair.split("=")[0]]: kvPair.split("=")[1] };
  });
  return Object.assign({}, ...keyValue)
}

// takes a url and returns a string with the query params (for react router)
export function rawQS(url) {
  if (typeof url !== "string") {
    return ''
  }
  if(url.split("?").length === 1){
    return ''
  }
  return url.split('?')[1]
}

/* basic bitch console testing
  function parseUrl(url) {
    if (typeof url !== "string") {
      console.error(`Cannot parse url of type ${typeof url}`);
      return false
    }
    if(url.split("?").length === 1){
      return false
    }
    const noUrl = url.split("?")[1]
    const keyValue = noUrl.split('&').map(kvPair => {
      return { [kvPair.split("=")[0]]: kvPair.split("=")[1] };
    });
    return Object.assign({}, ...keyValue)
  }

  console.log(parseUrl(2))
  console.log(parseUrl('www.google.com'))
  console.log(parseUrl('https://secure.flickr.com/search/?q=kittens'))
  console.log(parseUrl('www.google.com/index?key=value&key2=value2&key3=value3'))
  console.log(parseUrl('www.google.com/jsonapi/watchdog_entity/watchdog_entity?sort=-timestamp&page[limit]=50&page[offset]=100&filter[severityGroup][group][conjunction]=OR&filter[severity4][condition][value]=4&filter[severity4][condition][path]=severity&filter[severity4][condition][memberOf]=severityGroup')
*/