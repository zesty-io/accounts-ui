import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import styles from './TwoFactor.less'
import { request } from '../../../util/request'

import { Input } from '@zesty-io/core/Input'
import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

class TwoFactor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      polling: setInterval(this.poll2fa, 3000)
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.polling)
  }
  render() {
    return (
      <section className={styles.TwoFactor}>
        <form name="TwoFactor" className={styles.TwoFactorForm}>
          <Url
            href="https://zesty.io"
            title="https://zesty.io"
            className={styles.logo}>
            <img src="/zesty-io-logo.svg" height="70px" />
          </Url>

          <label>
            <p>Enter Authy Token</p>
            <small>
              To log in, open
              <Url href="https://authy.com/" target="_blank">
                Authy
              </Url>
              on your mobile device.
            </small>

            <Input
              type="text"
              autoComplete="off"
              name="token"
              className={styles.input}
            />
          </label>
          <ButtonGroup className={styles.controls}>
            <Button onClick={this.handle2FA}>
              <i className="fa fa-check-circle-o" aria-hidden="true" />
              Check 2FA Token
            </Button>
            <Link to="/login">
              <i className="fa fa-ban" aria-hidden="true" />
              &nbsp;Cancel
            </Link>
          </ButtonGroup>

          {this.state.message ? (
            <p className={styles.error}>
              <i className="fa fa-exclamation-triangle" aria-hidden="true" />
              &nbsp;{this.state.message}
            </p>
          ) : null}
        </form>
      </section>
    )
  }

  handle2FA = evt => {
    evt.preventDefault()
    request(`${CONFIG.API_AUTH}/verify-2fa`, {
      body: {
        token: document.forms.TwoFactor.token.value
      }
    })
      .then(json => {
        if (json.code === 200) {
          this.props.dispatch({
            type: 'FETCH_AUTH_SUCCESS',
            ZUID: json.meta.userZuid,
            auth: true
          })
          this.props.history.push('/instances')
        } else {
          this.setState({
            message: json.message
          })
          this.props.dispatch({
            type: 'FETCH_AUTH_ERROR',
            auth: false
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
  // Poll Auth service for OneTouch
  poll2fa = () => {
    request(`${CONFIG.API_AUTH}/verify-2fa`)
      .then(json => {
        if (json.code === 200) {
          this.props.dispatch({
            type: 'FETCH_AUTH_SUCCESS',
            ZUID: json.meta.userZuid,
            auth: true
          })
          this.props.history.push('/instances')
        }
      })
      .catch(err => {
        console.error('error', err)
        if (err === 401) {
          this.setState({ message: 'Your login was denied' })
        }
        if (err === 404) {
          this.setState({ message: 'Your login has expired' })
        }
        if (err === 500) {
          this.setState({ message: 'A server error occurred' })
        }
        setTimeout(() => {
          // Force reload
          window.location = '/login'
        }, 5000)
      })
  }
}
export default withRouter(connect(state => state)(TwoFactor))
