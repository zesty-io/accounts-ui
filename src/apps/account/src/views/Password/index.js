import React, { Component } from 'react'
import {connect} from 'react-redux'

class Password extends Component {
  render () {
    return (
      <section id='settings'>
        <h2>Password</h2>
        <div>Old Password </div><div><Input /></div>
        <div>New Password </div><div><Input /></div>
        <div>Confirm New Password </div><div><Input /></div>
        <Button text="Submit" />
      </section>
    )
  }
}

export default connect(state => state)(Password)
