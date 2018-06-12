import React, { Component } from 'react'

import { request } from '../../../util/request'

import styles from './ResendEmail.less'

export default class ResendEmail extends Component {
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
          <h2 />
          <p>Input the email address you signed up with</p>
          {this.state.error ? (
            <h3 className={styles.error}>
              <i className="fa fa-exclamation-triangle" />
              {this.state.error}
            </h3>
          ) : null}
          {this.state.success ? (
            <h3 className={styles.success}>{this.state.success}</h3>
          ) : null}
          <Input
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <Button onClick={this.handleClick} disabled={this.state.submitted}>
            Re-Send Verification
          </Button>
        </form>
      </section>
    )
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleClick = evt => {
    evt.preventDefault()
    if (
      this.state.email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}$/g)
    ) {
      this.setState({ submitted: !this.state.submitted })
      request(
        `${CONFIG.API_ACCOUNTS}/users/emails/verifications?address=${encodeURI(
          this.state.email
        )}`,
        {
          method: 'POST'
        }
      ).then(data => {
        this.setState({ submitted: !this.state.submitted })
        console.log(data)
        if (!data.error) {
          //notify and go back to login
          this.setState({
            success: 'A verification email has been re-sent!'
          })
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
