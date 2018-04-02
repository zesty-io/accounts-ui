import React, { Component } from 'react'
import { connect } from 'react-redux'

import Profile from './Profile'
import Email from './Email'
import Preferences from './Preferences'

import styles from './Account.less'

class Account extends Component {
  render() {
    return (
      <div className={styles.Account}>
      <h1>Profile</h1>
        <Profile />
        <br />
        <hr />
        <br />
        <h1>Emails</h1>
        <Email />
        <br />
        <hr />
        <br />
        <h1>Preferences</h1>
        <Preferences />
      </div>
    )
  }
}

export default connect(state => state)(Account)
