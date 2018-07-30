import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Url } from '@zesty-io/core/Url'

import styles from './Logout.less'
import { logout } from '../../store/auth'

class Logout extends Component {
  componentDidMount() {
    this.props.dispatch(logout())
  }
  render() {
    return (
      <section className={styles.LogoutWrap}>
        <div className={styles.Logout}>
          <header>
            <Url href="https://zesty.io" title="https://zesty.io">
              <img src="/zesty-io-logo.svg" height="70px" />
            </Url>
          </header>

          <main className={styles.gridSingle}>
            <div className={styles.createAccount}>
              <p>logging you out...</p>
            </div>
          </main>
        </div>
      </section>
    )
  }
}

export default withRouter(connect(state => state)(Logout))
