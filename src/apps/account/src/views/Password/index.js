import React, { Component } from 'react'
import {connect} from 'react-redux'

class Password extends Component {
  render () {
    return (
      <section id='settings'>
        <h2>Password</h2>
        <div>Old Password </div><div><Input name='oldPassword' /></div>
        <div>New Password </div><div><Input name='newPassword' /></div>
        <div>Confirm New Password </div><div><Input name='confirmNewPassword' /></div>
        <Button text="Submit" />
      </section>
    )
  }
}

export default connect(state => state)(Password)
