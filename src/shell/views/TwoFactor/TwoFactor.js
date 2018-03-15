import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './TwoFactor.less'
import { request } from '../../../util/request'
import config from '../../../shell/config'

// TODO poll 2FA for one touch
class TwoFactor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'TEST ERROR MESSAGE, PLZ STYLE'
    }
  }
  render() {
    return (
      <section className={styles.TwoFactor}>
        <form name="TwoFactor" className={styles.TwoFactorForm}>
          <img src="/zesty-z-logo.svg" />
          <h2>Two Factor Authentication</h2>
          <label>
            <p>Authy Two Factor Token</p>
            <Input type="text" name="token" className={styles.input} />
          </label>
          <Button onClick={this.handle2FA}>Check Token</Button>
          <p>{this.state.message}</p>
        </form>
      </section>
    )
  }
  handle2FA = evt => {
    evt.preventDefault()
    request(`http://${config.SERVICE_URL}:3011/verify-2fa`, {
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
        throw err
      })
  }
}
export default connect(state => state)(TwoFactor)
