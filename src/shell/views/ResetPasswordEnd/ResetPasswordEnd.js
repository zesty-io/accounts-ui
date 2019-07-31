import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import qs from 'qs'

import styles from './ResetPasswordEnd.less'
import { request } from '../../../util/request'

import { Input } from '@zesty-io/core/Input'
import { Button } from '@zesty-io/core/Button'
import { ButtonGroup } from '@zesty-io/core/ButtonGroup'

class ResetPasswordEnd extends Component {
  state = {
    message: '',
    token: '',
    address: '',
    submitted: false
  }
  componentDidMount() {
    // take the token and email address from the url and store it in state
    const qParams = qs.parse(window.location.search.substr(1))
    qParams.token && this.setState({ token: qParams.token })
    qParams.address && this.setState({ address: qParams.address })
  }
  render() {
    return (
      <section className={cx(styles.ResetPasswordEnd, styles.bodyText)}>
        <div className={styles.Wrapper}>
          <header className={styles.Logo}>
            <img src="/zesty-io-logo.svg" />
          </header>
          <main>
            <form
              name="ResetPasswordEnd"
              onSubmit={this.handleCompleteReset}
              className={styles.ResetPasswordEndForm}>
              <h2 className={styles.headline}>Choose Your New Password</h2>
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

              {this.state.message ? (
                <p className={styles.error}>
                  <i
                    className="fa fa-exclamation-triangle"
                    aria-hidden="true"
                  />
                  &nbsp;{this.state.message}
                </p>
              ) : null}

              <ButtonGroup className={styles.controls}>
                <Button disabled={this.state.submitted}>
                  <i className="fas fa-edit"></i>
                  {this.state.submitted ? 'Requesting Reset' : 'Reset Password'}
                </Button>
                <Link to="/login">
                  <i className="fa fa-ban" aria-hidden="true" />
                  &nbsp;Cancel
                </Link>
              </ButtonGroup>
            </form>
          </main>
        </div>
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
      method: 'POST',
      json: true,
      body: {
        code: this.state.token,
        email: this.state.address,
        password
      }
    })
      .then(data => {
        // send the user back to login once their password has been updated
        if (data.code === 200) {
          return this.props.history.push('/login')
        } else {
          this.setState({
            message: `There was a problem with your password reset confirmation: ${data.message}`,
            submitted: false
          })
        }
      })
      .catch(err => {
        this.setState({
          message: `There was a problem with your password reset confirmation: ${err}`,
          submitted: false
        })
      })
  }
}

export default withRouter(ResetPasswordEnd)
