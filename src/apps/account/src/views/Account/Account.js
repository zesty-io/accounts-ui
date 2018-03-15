import React, { Component } from 'react'
import { connect } from 'react-redux'

import Profile from './Profile'
import Email from './Email'

class Account extends Component {
  render() {
    return (
      <div>
        <Profile />
        <br />
        <hr />
        <br />
        <Email />
      </div>
    )
  }
}

export default connect(state => state)(Account)
