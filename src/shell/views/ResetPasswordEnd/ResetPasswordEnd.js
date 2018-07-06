import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import qs from 'qs'

import styles from './ResetPasswordEnd.less'
import { request } from '../../../util/request'

class ResetPasswordEnd extends Component {
  state = {
    message: '',
    token: '',
    address: '',
    submitted: false
  }
  componentDidMount() {
    // take the token from the url and store it in state
    const qParams = qs.parse(window.location.search.substr(1))
    qParams.token && this.setState({ token: qParams.token })
    qParams.address && this.setState({ address: qParams.address })
  }
  render() {
    return (
      <section className={styles.ResetPasswordEnd}>
        <form
          name="ResetPasswordEnd"
          onSubmit={this.handleCompleteReset}
          className={styles.ResetPasswordEndForm}>
          <img src="/zesty-io-logo.svg" />
          <h2>Enter New Password</h2>
          <label>
            <p>New Password</p>
            <Input className={styles.input} type="password" name="pass" />
          </label>
          <label>
            <p>Confirm New Password</p>
            <Input
              className={styles.input}
              type="password"
              name="passConfirm"
            />
          </label>
          <Button disabled={this.state.submitted}>
            {this.state.submitted ? 'Requesting Reset' : 'Reset Password'}
          </Button>
        </form>
        {this.state.message ? (
          <p className={styles.error}>
            <i className="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;{
              this.state.message
            }
          </p>
        ) : null}
      </section>
    )
  }
  handleCompleteReset = evt => {
    const password = evt.target.pass.value
    evt.preventDefault()
    this.setState({ submitted: true })
    if (evt.target.pass.value !== evt.target.passConfirm.value) {
      return this.setState({
        message: 'Your passwords do not match',
        submitted: false
      })
    }
    return request(`${CONFIG.API_AUTH}/password-reset`, {
      body: {
        code: this.state.token,
        email: this.state.address,
        password
      }
    })
      .then(data => {
        // send the user back to login once their password has been updated
        this.props.history.push('/login')
      })
      .catch(err => {
        this.setState({
          message: `There was a problem with your password reset confirmation: ${err}`
        })
      })
      .finally(() => this.setState({ submitted: false }))
  }
}

export default withRouter(ResetPasswordEnd)
