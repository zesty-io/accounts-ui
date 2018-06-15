import { Component } from 'react'
import { connect } from 'react-redux'

import { fetchUserEmails } from '../../../../../shell/store/user'

import Profile from './components/Profile'
import Email from './components/Email'
import Password from './components/Password'
import TwoFactor from './components/TwoFactor'
import Preferences from './components/Preferences'

import styles from './Account.less'

class Account extends Component {
  state = {
    loadingEmails: true
  }
  componentDidMount() {
    this.props.dispatch(fetchUserEmails()).then(data => {
      this.setState({
        loadingEmails: false
      })
    })
  }
  render() {
    return (
      <section className={styles.Settings}>
        <h1 className={styles.SettingsTitle}>Manage Your Account Settings</h1>
        <div className={styles.setting}>
          <WithLoader
            className={styles.Loading}
            condition={!this.state.loadingEmails}
            message="Loading Your Account Data">
            <div className={styles.SettingCards}>
              <Profile />
              <Email
                dispatch={this.props.dispatch}
                user={this.props.user}
                emails={this.props.user.emails}
                loadingEmails={this.state.loadingEmails}
              />
              <Password />
              <TwoFactor
                dispatch={this.props.dispatch}
                user={this.props.user}
              />
              <Preferences
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

export default connect(state => state)(Account)
