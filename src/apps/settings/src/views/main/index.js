import React, { Component } from 'react'
import {connect} from 'react-redux'

class Settings extends Component {
  render () {
    return (
      <section id='settings'>
        <h2>Settings</h2>
        <p>Hello, {this.props.user.firstname} {this.props.user.lastname}</p>
        <p>Email: {this.props.user.email}</p>
      </section>
    )
  }
}

export default connect(state => state)(Settings)
