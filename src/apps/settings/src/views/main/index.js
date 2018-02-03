import React, { Component } from 'react'
import {connect} from 'react-redux'

class Settings extends Component {
  render () {
    return (
      <section id='settings'>
        <h2>Settings</h2>
      </section>
    )
  }
}

export default connect(state => state)(Settings)
