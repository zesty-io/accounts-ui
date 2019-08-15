import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Loader } from '@zesty-io/core/Loader'

import { logout } from '../../store/auth'

import styles from './Logout.less'
export default withRouter(
  connect(state => state)(
    class Logout extends Component {
      componentDidMount() {
        this.props.dispatch(logout()).then(_ => {
          setTimeout(() => {
            window.location = '/login'
          }, 1000)
        })
      }
      render() {
        return (
          <section className={styles.LogoutWrap}>
            <div className={styles.Logout}>
              <main className={styles.gridSingle}>
                <div className={styles.createAccount}>
                  <p className={styles.display}>Signing Out</p>
                  <Loader />
                </div>
              </main>
            </div>
          </section>
        )
      }
    }
  )
)
