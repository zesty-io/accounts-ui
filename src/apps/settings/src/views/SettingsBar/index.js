import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

import './settingsbar.less'

class Settings extends Component {
  render () {
    return (
      <ul >
        <li><NavLink to="/settings/profile">Profile</NavLink></li>
        <li><NavLink to="/settings/blueprints">Blueprints</NavLink></li>
        <li><NavLink to="/settings/email">Emails</NavLink></li>
        <li><NavLink to="/settings/password">Password</NavLink></li>
        <li><NavLink to="/settings/security">Security</NavLink></li>
      </ul>
    )
  }
}

export default connect(state => state)(Settings)
