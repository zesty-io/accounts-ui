import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { request } from '../../../util/request'

import styles from './ResendEmail.less'

class ResendEmail extends Component {
  state = {
    email: '',
    submitted: false,
    error: null,
    success: null
  }
  render() {
    return (
      <section className={styles.VerifyEmail}>
        <form name="VerifyEmail" className={styles.VerifyEmailForm}>
          <h1>Send another Verification email-</h1>
          <p>
            Once your email has been verified you can log in and begin using
            Zesty.io
          </p>
          {this.state.error ? (
            <h3 className={styles.error}>
              <i className="fa fa-exclamation-triangle" />
              {this.state.error}
            </h3>
          ) : null}
          {this.state.success ? (
            <h3 className={styles.success}>{this.state.success}</h3>
          ) : null}
          <section className={styles.form}>
            <Input
              name="email"
              placeholder="email@acme.com"
              onChange={this.handleChange}
              value={this.state.email}
              className={styles.input}
            />
            <Button
              onClick={this.handleClick}
              className={styles.button}
              disabled={this.state.submitted}>
              Re-Send Verification
            </Button>
          </section>
        </form>
      </section>
    )
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleClick = evt => {
    evt.preventDefault()
    console.log(this.state.email)
    if (
      this.state.email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}$/g)
    ) {
      this.setState({ submitted: !this.state.submitted })
      request(
        `${CONFIG.API_ACCOUNTS}/users/emails/verifications?address=${
          this.state.email
        }`,
        {
          method: 'POST'
        }
      ).then(data => {
        this.setState({ submitted: !this.state.submitted })
        if (!data.error) {
          //notify and go back to login
          this.setState({
            success: 'A verification email has been re-sent!'
          })
          setTimeout(() => this.props.history.push(`/login`), 3000)
        } else {
          //display an error to the user
          this.setState({
            error:
              'There was a problem re-sending verification to the email you provided'
          })
        }
      })
    } else {
      this.setState({
        error: 'you must provide a valid email address'
      })
    }
  }
}

export default withRouter(ResendEmail)
