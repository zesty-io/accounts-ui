import React, { Component } from 'react'
import styles from './AppError.less'

import { Url } from '@zesty-io/core/Url'

export default class AppError extends Component {
  constructor(props) {
    super(props)
    this.state = {
      err: null,
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({
      err: error,
      hasError: true
    })
    // log the error to error reporting services
    Raven.captureException(error)
    bugsnagClient.notify(error)
    console.error(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className={styles.AppCrash}>
          <h1>
            <i className="fa fa-bug" aria-hidden="true" />
            &nbsp;We apologize but something went wrong
          </h1>
          <h3>
            Try reloading the application (CMD + R).&nbsp;
            <Url
              href={`mailto:support@zesty.io?subject=Accounts App Crash&body=REPLACE WITH EXTRA INFORMATION ---- ${this.state.err}`}
              target="_blank">
              Report to support@zesty.io
            </Url>
          </h3>
        </section>
      )
    } else {
      return this.props.children
    }
  }
}
