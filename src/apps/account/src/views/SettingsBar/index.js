import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

import './settingsbar.less'

class Settings extends Component {
  render () {
    return (
      <ul >
        <li><NavLink to="/account/combined">Account</NavLink></li>
        <li><NavLink to="/account/security">Security</NavLink></li>
        <li><NavLink to="/account/blueprints">Blueprints</NavLink></li>
      </ul>
    )
  }
}

export default connect(state => state)(Settings)
