// takes a url and returns false or an object of the key value pairs from the query string
export default function(url) {
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
*/