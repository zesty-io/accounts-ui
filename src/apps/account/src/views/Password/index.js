import React, { Component } from 'react'
import {connect} from 'react-redux'

class Password extends Component {
  render () {
    return (
      <section id='settings'>
        <h2>Password</h2>
        <div>Old Password </div><div><Input name='oldPassword' type='password'/></div>
        <div>New Password </div><div><Input name='newPassword' type='password'/></div>
        <div>Confirm New Password </div><div><Input name='confirmNewPassword' type='password'/></div>
        <Button text="Submit" />
      </section>
    )
  }
}

export default connect(state => state)(Password)
