<div style="text-align:center;">
  <img title="Logo for Zesty.io" width="300px" height="72px" src="https://brand.zesty.io/zesty-io-logo-horizontal.png" />  
</div>

> Application for managing your account, instances, teams and blueprints within the Zesty.io CMS

<br />

**[Start by creating a free instance](https://start.zesty.io/)**

You have found the code base which powers the Zesty.io account management experience. While this code base can be run locally it is only recommended to do so for developing. If you would like to learn more about Zesty.io visit our [documentation at zesty.org](https://zesty.org/)

**Browser Support**

- Chrome / Firefox / Edge / Safari (latest)
- IE11
  - https://github.com/philipwalton/flexbugs#flexbug-4

## Architecture

![accounts-ui-arcitecture](https://jvsr216n.media.zestyio.com/accounts-ui-code-architecture.png)

We are working towards the [PRPL pattern](https://developers.google.com/web/fundamentals/performance/prpl-pattern/) for delivering a <abbr title="Progressive Web App">PWA</abbr> as described by [Addy Osmani on developers.google.com](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)

Currently we bundle our "sub-apps" individually but include them all on initial load. Eventually we want these bundles to be loaded on demand when their views are visited and the code becomes necessary.

### State

We use [Redux](https://redux.js.org/) for managing our state and follow a single app store pattern. All persistent application state is maintained in a single global store.

### Design System

The [Zesty.io design system](https://github.com/zesty-io/design-system) is our central location for components and patterns which are shared across our various external and internal applications. Our design system follows the [atomic design pattern](http://atomicdesign.bradfrost.com/) popularized by Brad Frost.

Can be installed via `npm install @zesty-io/core` into any application. This is under active development and will have major breaking changes until we land 1.0. **NOT PRODUCTION READY**

### Error Handling

#### User Notifications

When ever possible we want to communicate useful information to end users when errors occur. Using our [global notification component](https://github.com/zesty-io/accounts-ui/tree/master/src/shell/components/Notify) we are able to provide a consistent and learned behavior for our users to understand when actions are successful or fail. As well as hopefully being able to provide a solution to failures.

#### Error Aggregation

Being aware of errors your users experience is an important part of iterating and improving upon an application. We use [Sentry](https://sentry.io) for error aggregation in order to capture, debug and report on code quality.

## Developing

    Terminal One:  npm run serve
    Terminal Two:  npm run start

This will install all necessary dependencies and do a development build which will begin watching your files and rebuild when changes occur. You will need the complete stack running in order to load the account-ui.

## Testing

To setup your local environment for tests run:

    npm run test:setup

This pulls the secrets file down and adds a DNS entry in your `/etc/hosts` file for routing requests to `accounts.dev.zesty.io` back to localhost to prevent running into CORS issues.

**Note**

**If you find yourself actually needing to login to the remote dev environment then don't forget to comment out the following line in your `/etc/hosts` file that was added by the above script:**

    127.0.0.1 accounts.dev.zesty.io

Otherwise you'll be routed to localhost.

Then you can either:

1 - Run your tests in headless mode:

    npm run test

2 - Selectively run your tests in the Cypress UI:

    npm run test:open

### Running Locally & Deploying

This application is configured to run and deploy against our internal stack and process. As such we do not provide a way to run on `localhost`.

When deploying it is important to use the `npm run build-production` command as this will cause a production [webpack](https://webpack.js.org/) build which adds large optimizations to the bundle size and runtime code.

---

Copyright (C) [Zesty.io Inc.](https://zesty.io/)
