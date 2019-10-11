import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchUserEmails } from '../../../../../shell/store/user'
import { notify } from '../../../../../shell/store/notifications'
import { zConfirm } from '../../store/confirm'

import Profile from './components/Profile'
import Email from './components/Email'
import Password from './components/Password'
import TwoFactor from './components/TwoFactor'
import Preferences from './components/Preferences'

import { WithLoader } from '@zesty-io/core/WithLoader'

import styles from './Account.less'
export default connect(state => state)(
  class Account extends Component {
    state = {
      loadingEmails: true
    }
    componentDidMount() {
      this.props
        .dispatch(fetchUserEmails())
        .then(data => {
          this.setState({
            loadingEmails: false
          })
        })
        .catch(err => {
          this.props.dispatch(
            notify({
              message: `Error fetching emails`,
              type: 'error'
            })
          )
        })

      // if (!this.props.user.prefs.hasSelectedDev) {
      //   this.props.dispatch(
      //     zConfirm({
      //       prompt:
      //         'Are you interested in using developer features, such as access to blueprints? You can change this any time in your account settings.',
      //       callback: response => {
      //         if (response) {
      //           this.props.dispatch({
      //             type: 'DEV_PREFS',
      //             payload: 1
      //           })
      //           this.props.dispatch(
      //             saveProfile({
      //               websiteCreator: true
      //             })
      //           )
      //         } else {
      //           this.props.dispatch({
      //             type: 'DEV_PREFS',
      //             payload: 0
      //           })
      //           this.props.dispatch(
      //             saveProfile({
      //               websiteCreator: false
      //             })
      //           )
      //         }
      //       }
      //     })
      //   )
      // }
    }
    render() {
      document.title = 'Accounts: My Account'
      return (
        <section className={styles.Settings}>
          <h1 className={styles.SettingsTitle}>Manage Your Account Settings</h1>
          <div className={styles.setting}>
            <WithLoader
              className={styles.Loading}
              condition={!this.state.loadingEmails}
              message="Loading Your Account Data">
              <div className={styles.SettingCards}>
                <Profile className={styles.SettingCard} />
                <Email
                  className={styles.SettingCard}
                  dispatch={this.props.dispatch}
                  user={this.props.user}
                  emails={this.props.user.emails}
                  loadingEmails={this.state.loadingEmails}
                />
                <Password
                  history={this.props.history}
                  className={styles.SettingCard}
                />
                <TwoFactor
                  className={styles.SettingCard}
                  dispatch={this.props.dispatch}
                  user={this.props.user}
                />
                <Preferences
                  className={styles.SettingCard}
                  user={this.props.user}
                  dispatch={this.props.dispatch}
                />
              </div>
            </WithLoader>
          </div>
        </section>
      )
    }
  }
)
