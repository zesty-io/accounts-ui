import React, { Component } from 'react'
import { connect } from 'react-redux'

import Profile from './Profile'
import Email from './Email'
import Preferences from './Preferences'

class Account extends Component {
  render() {
    return (
      <React.Fragment>
        <Profile />
        <br />
        <hr />
        <br />
        <Email />
        <br />
        <hr />
        <br />
        <Preferences />
      </React.Fragment>
    )
  }
}

export default connect(state => state)(Account)
