#! /usr/bin/env node

const webpack = require('webpack')
const fs = require('fs')
const path = require('path')

module.exports = buildIndex = build => {
  const html = `
  <html>
    <head>
      <script src="//fast.appcues.com/57826.js"></script>
      <meta charset="UTF-8">
      <title>Accounts</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      <link href="https://fonts.googleapis.com/css?family=Montserrat:200,400,500,500i" rel="stylesheet">
      <style type="text/css">
        * {
          margin: 0;
          padding: 0;
        }

        html,
        body {
          background-color: #f2f4fb;
          color: #5B667D;
          font-family: "Montserrat", Arial, sans-serif;
          font-weight: 400;
          font-size: 1em;
        }

        h1, h2, h3, h3, h5, h6 {
          font-weight: 500;
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
      <link rel="icon" type="image/png" href="https://brand.zesty.io/zesty-io-logo-dark.png" />

      <link href="/bundle.${build.data.gitCommit}.shell.css" type="text/css" rel="stylesheet" />
      <link href="/bundle.${build.data.gitCommit}.properties-app.css" type="text/css" rel="stylesheet" />
      <link href="/bundle.${build.data.gitCommit}.settings-app.css" type="text/css" rel="stylesheet" />
      <link href="/bundle.${build.data.gitCommit}.blueprints-app.css" type="text/css" rel="stylesheet" />
      <link href="/bundle.${build.data.gitCommit}.support-app.css" type="text/css" rel="stylesheet" />
      <link href="/bundle.${build.data.gitCommit}.teams-app.css" type="text/css" rel="stylesheet" />

      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css" rel="stylesheet" />

      <!-- Polyfills for IE11 -->
      <script>
        if (!window.fetch) {
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "/bundle.${build.data.gitCommit}.polyfills.js";
          document.head.appendChild(script);
        }
      </script>

      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-21247490-1"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-21247490-1');
        gtag('config', 'AW-955374362');
      </script>


    </head>

    <body>
      <main id="root">
        <div id="appBoot">
          <div id="aligner">
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
      <script src=https://cdn.ravenjs.com/3.26.4/raven.min.js
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
      <script>
        if (window.location.protocol === 'http:' && CONFIG.ENV === 'production') {
          window.location = 'https://accounts.zesty.io'+window.location.pathname+window.location.hash
        }
      </script>

      <script src="/bundle.${build.data.gitCommit}.vendors.js"></script>

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
