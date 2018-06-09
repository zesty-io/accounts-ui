import { Component } from 'react'
import { connect } from 'react-redux'

import Profile from './components/Profile'
import Email from './components/Email'
import Password from './components/Password'
import TwoFactor from './components/TwoFactor'

import styles from './Account.less'

class Account extends Component {
  render() {
    return (
      <section className={styles.Settings}>
        <h1 className={styles.SettingsTitle}>Manage Your Account Settings</h1>
        <div className={styles.setting}>
          <div className={styles.SettingCards}>
            <Profile />
            <Email />
            <Password />
            <TwoFactor />
          </div>
        </div>
      </section>
    )
  }
}

export default connect(state => state)(Account)
