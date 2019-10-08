import React, { Component } from 'react'

import { AppLink } from '@zesty-io/core/AppLink'

import styles from './VerifyEmail.less'
export default class VerifyEmail extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    document.title = 'Accounts: Verify Email'
    return (
      <section className={cx(styles.VerifyEmail, styles.bodyText)}>
        <main className={styles.aligner}>
          <h1 className={styles.display}>
            <i className="fas fa-envelope-open-text"></i>&nbsp;Verify Your Email
          </h1>

          <p className={styles.bodyText}>
            We have sent a verification email from{' '}
            <strong>
              <code>donotreply@system.zesty.email</code>
            </strong>{' '}
            to the email address you signed up with. This is done for account
            security to ensure you are the owner of the email address. If you do
            not see a verification email in your inbox, make sure to check your
            spam folder.
          </p>

          <p className={styles.bodyText}>
            Do not see the email?{' '}
            <strong>
              <AppLink to="/resend-email">
                <i className="fas fa-paper-plane"></i>&nbsp;Re-send Email
              </AppLink>
            </strong>
          </p>

          <AppLink className={styles.Continue} to="/logout">
            <i className="fas fa-sign-in-alt"></i>&nbsp;Return to Sign In
          </AppLink>
        </main>
      </section>
    )
  }
}
