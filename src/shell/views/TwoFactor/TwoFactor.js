import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './TwoFactor.less'
import { request } from '../../../util/request'
import config from '../../../shell/config'

// TODO poll 2FA for one touch
class TwoFactor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }
  }
  componentDidMount() {
    let polling = setInterval(this.poll2fa, 3000)
  }

  componentWillUnmount() {
    clearInterval('polling')
  }

  poll2fa = () => {
    request(`${config.API_AUTH}/auth/verify-2fa`).then(json => {
      console.log(json)
      if (json.code === 202) {
        return
      }
      if (json.code === 200) {
        this.props.dispatch({
          type: 'FETCH_AUTH_SUCCESS',
          zuid: '',
          auth: true
        })
        window.location = '/properties'
      }
    }).catch(err => {
      console.table(err)
      this.setState({ message: 'Your login was denied'})
      setTimeout(() => {
        window.location = '/login'
      }, 5000)
    })
  }

  render() {
    return (
      <section className={styles.TwoFactor}>
        <form name="TwoFactor" className={styles.TwoFactorForm}>
          <img src="/zesty-io-logo.svg" />
          {this.state.message ? (
            <p className={styles.error}>
              <i className="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;{
                this.state.message
              }
            </p>
          ) : null}
          <label>
            <p>Enter Authy Token</p>
            <small>
              To log in, open
              <Url href="https://authy.com/" target="_blank">
                Authy
              </Url>
              on your mobile device.
            </small>
            <Input type="text" name="token" className={styles.input} />
          </label>
          <ButtonGroup className={styles.controls}>
            <Button onClick={this.handle2FA}>Check 2FA Token</Button>
            <Link to="/login">
              <i className="fa fa-ban" aria-hidden="true" />
              &nbsp;Cancel
            </Link>
          </ButtonGroup>
        </form>
      </section>
    )
  }
  handle2FA = evt => {
    evt.preventDefault()
    request(`${config.API_AUTH}/verify-2fa`, {
      body: {
        token: document.forms.TwoFactor.token.value
      }
    })
      .then(json => {
        if (json.code === 200) {
          this.props.dispatch({
            type: 'FETCH_AUTH_SUCCESS',
            zuid: json.meta.userZuid,
            auth: true
          })
          window.location = '/properties'
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
        console.table(err)
        throw err
      })
  }
}
export default connect(state => state)(TwoFactor)
