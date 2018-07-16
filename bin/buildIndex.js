#! /usr/bin/env node

const webpack = require('webpack')
const fs = require('fs')
const path = require('path')

module.exports = buildIndex = build => {
  const html = `
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Zesty.io Accounts Application</title>
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

        #aligner {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        #aligner h1 {
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

      <!-- Polyfills for IE11 -->
      <script>
        if (!window.fetch) {
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "/config.${build.data.gitCommit}.js";
          document.head.appendChild(script);
        }
      </script>
    </head>

    <body>
      <main id="root">
        <div id="appBoot">
          <div id="aligner">
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
