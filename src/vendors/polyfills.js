// Polyfills
// @see https://www.npmjs.com/package/core-js
// Our polyfills are to support IE11
// https://github.com/aspnet/JavaScriptServices/wiki/Supporting-Internet-Explorer-11-(or-older)
import 'core-js/fn/object/assign'
import 'core-js/fn/string/includes'
import 'core-js/fn/array/includes'
import 'core-js/fn/promise'
import 'whatwg-fetch'

// closest
// @see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this

    do {
      if (el.matches(s)) return el
      el = el.parentElement || el.parentNode
    } while (el !== null && el.nodeType === 1)
    return null
  }
}
