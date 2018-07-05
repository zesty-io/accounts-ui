# Zesty.io Accounts User Interface

We are following the "sub-app" pattern established in `zesty-io/instances-ui`. This will allow us to grow the accounts-app product surface without forcing code on users who will not need it. We can split "sub-apps" by roles and only load the necessary code for each user.

This also aligns us with eventually making this a PWA.

## Running Locally

This app requires the Zesty.io platform(`zesty-io/zesty-dev`) to be running and available in order to load data, handle authentication, etc. The app itself can be run locally with the command:

    npm start

This will do the following tasks:

* Install all dependencies
* Build all necessary bundles
  * Watch code for updates and rebuild bundles
* Start a local server on `localhost:6006`

## Production

### Building

It's very important when deploying to production a "production" webpack build is done. This will add large optimizations to the bundle size and runtime code.

    npm run build

Build environments-

    npm run build-development
    npm run build-stage
    npm run build-production


### Deploying

**TODO// develop deploy process**
