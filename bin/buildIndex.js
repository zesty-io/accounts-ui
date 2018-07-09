#! /usr/bin/env node

const webpack = require('webpack')
const fs = require('fs')
const path = require('path')

module.exports = buildIndex = build => {
  const html = `
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Zesty Accounts</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      <style type="text/css">
        * {
          margin: 0;
          padding: 0;
        }

        html,
        body {
          background-color: #f2f4fb;
          color: #5B667D;
          font-family: 'GibsonRegular', Arial, sans-serif;
          font-size: 1em;
        }

        #appBoot {
          align-items: center;
          display: flex;
          justify-content: center;
          width: 100vw;
          height: 100vh;
        }

        #center {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        #center h1 {
          font-size: 2em;
          text-shadow: 1px 1px 1px #d6e5ff;
        }

        .loader {
          display: flex;
          height: 2rem;
        }

        .loader .bar {
          animation: fade 1s infinite ease-in-out;
          background-color: #5B667D;
          margin: 0.5rem;
          opacity: 1;
          width: 1rem;
        }

        .loader .bar:nth-child(1) {
          animation-delay: -0.16s
        }

        .loader .bar:nth-child(2) {
          animation-delay: 1s
        }

        .loader .bar:nth-child(3) {
          animation-delay: -0.32s
        }

        .loader .bar:nth-child(4) {
          animation-delay: 2s
        }

        .loader .bar:nth-child(5) {
          animation-delay: -0.16s
        }

        @keyframes fade {
          0%,
          80%,
          100% {
            opacity: 1;
          }
          40% {
            opacity: 0.3;
          }
        }
      </style>
      <link rel="icon" type="image/png" href="/favicon.png" />

      <link href="/bundle.${
        build.data.gitCommit
      }.core.css" type="text/css" rel="stylesheet" />
      <link href="/bundle.${
        build.data.gitCommit
      }.shell.css" type="text/css" rel="stylesheet" />
      <link href="/bundle.${
        build.data.gitCommit
      }.properties-app.css" type="text/css" rel="stylesheet" />
      <link href="/bundle.${
        build.data.gitCommit
      }.settings-app.css" type="text/css" rel="stylesheet" />
      <link href="/bundle.${
        build.data.gitCommit
      }.blueprints-app.css" type="text/css" rel="stylesheet" />
      <link href="/bundle.${
        build.data.gitCommit
      }.support-app.css" type="text/css" rel="stylesheet" />
      <link href="/bundle.${
        build.data.gitCommit
      }.teams-app.css" type="text/css" rel="stylesheet" />

      <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
    </head>

    <body>
      <main id="root">
        <div id="appBoot">
          <div id="center">
            <h1>Starting Zesty.io</h1>
            <div class="loader">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </div>
          </div>
        </div>
      </main>
      <!-- polyfills for relic browsers -->
      <script>
      if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
          value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
              throw new TypeError('Cannot convert undefined or null to object');
            }
      
            var to = Object(target);
      
            for (var index = 1; index < arguments.length; index++) {
              var nextSource = arguments[index];
      
              if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                  // Avoid bugs when hasOwnProperty is shadowed
                  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                  }
                }
              }
            }
            return to;
          },
          writable: true,
          configurable: true
        });
      }
      if (!Object.keys) {
        Object.keys = (function() {
          'use strict';
          var hasOwnProperty = Object.prototype.hasOwnProperty,
              hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
              dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
              ],
              dontEnumsLength = dontEnums.length;
      
          return function(obj) {
            if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
              throw new TypeError('Object.keys called on non-object');
            }
      
            var result = [], prop, i;
      
            for (prop in obj) {
              if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
              }
            }
      
            if (hasDontEnumBug) {
              for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                  result.push(dontEnums[i]);
                }
              }
            }
            return result;
          };
        }());
      }
      if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', {
          value: function(searchElement, fromIndex) {
      
            if (this == null) {
              throw new TypeError('"this" is null or not defined');
            }
      
            // 1. Let O be ? ToObject(this value).
            var o = Object(this);
      
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;
      
            // 3. If len is 0, return false.
            if (len === 0) {
              return false;
            }
      
            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;
      
            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      
            function sameValueZero(x, y) {
              return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }
      
            // 7. Repeat, while k < len
            while (k < len) {
              // a. Let elementK be the result of ? Get(O, ! ToString(k)).
              // b. If SameValueZero(searchElement, elementK) is true, return true.
              if (sameValueZero(o[k], searchElement)) {
                return true;
              }
              // c. Increase k by 1. 
              k++;
            }
      
            // 8. Return false
            return false;
          }
        });
      }
      </script>

      <!-- Bug Reporting -->
      <script src=https://cdn.ravenjs.com/3.24.0/raven.min.js
      crossorigin=anonymous></script>
      <script>
        Raven.config('https://12c3a25b9d4c4442aa93f22dcf39c26a@sentry.io/1229171', {
          release: '${build.data.gitCommit}',
          environment: '${build.data.environment}',
          ignoreErrors: [/^Invalid user$/g]
        }).install()
      </script>
      <script src="//d2wy8f7a9ursnm.cloudfront.net/v4/bugsnag.min.js"></script>
      <script>
        window.bugsnagClient = bugsnag({
          apiKey: '7e50d87ea61932f9e3141420402f4eed',
          appVersion: '${build.data.gitCommit}',
          releaseStage: '${build.data.environment}'
        })
      </script>

      <script src="/config.${build.data.gitCommit}.js"></script>
      <script src="/bundle.${build.data.gitCommit}.vendors.js"></script>
      <script src="/bundle.${build.data.gitCommit}.core.js"></script>

      <!-- load sub apps -->
      <script src="/bundle.${build.data.gitCommit}.properties-app.js"></script>
      <script src="/bundle.${build.data.gitCommit}.settings-app.js"></script>
      <script src="/bundle.${build.data.gitCommit}.blueprints-app.js"></script>
      <script src="/bundle.${build.data.gitCommit}.support-app.js"></script>
      <script src="/bundle.${build.data.gitCommit}.teams-app.js"></script>
      <script src="/bundle.${build.data.gitCommit}.shell.js"></script>


    </body>
  </html>
  `

  fs.writeFileSync(path.resolve(process.cwd(), 'build/index.html'), html)

  return html
}
