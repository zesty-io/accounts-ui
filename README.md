# Zesty.io Accounts User Interface

We are following the "sub-app" pattern established in the `zesty-io/manager-app`. This will allow us to grow the accounts-app product surface without forcing code on users who will not need it. We can split "sub-apps" by roles and only load the necessary code for each user.

This also aligns us with eventually making this a PWA.

## Running Locally

This app requires the Zesty.io platform(`zesty-io/zesty-dev`) to be running and available in order to load data, handle authentication, etc. The app itself can be ran locally with the command:

    npm start

This will do the following tasks:

- Install all dependencies
- Build all necessary bundles
	- Watch code for updates and rebuild bundles
- Start a local server on `localhost:9000`

## Production

### Building

It's very important when deploying to production a "production" webpack build is done. This will add large optimizations to the bundle size and runtime code. In order to make a production build run:

	npm run build

### Deploying

**TODO// develop deploy process**
