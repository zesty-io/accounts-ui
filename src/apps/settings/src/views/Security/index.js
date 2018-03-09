import React, { Component } from 'react'
import {connect} from 'react-redux'

class Security extends Component {
  render () {
    return (
      <section id='settings'>
        <div className="inner security">
        <h1>Security</h1>
        <h3>Two-factor authentication</h3>
        {
          this.props.settings.twofa ?
          <div><p>Two-factor authentication currently set up for this account.</p>
        <Button text='Disable Two-factor' /></div>
          :
          <div><p>Two-factor authentication is not currently set up for this account.</p>
        <Button text='Enable Two-factor' /></div>
        }
      </div>
    </section>
    )
  }
}

export default connect(state => state)(Security)
