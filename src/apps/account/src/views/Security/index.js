import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddAuth from './AddAuth'

import { updateSetting } from '../../store'

class Security extends Component {
  handleEnable = e => {
    this.props.dispatch(updateSetting({ twofa: true, showAuth: true }))
  }

  handleDisable = e => {
    this.props.dispatch(updateSetting({ twofa: false, showAuth: false }))
  }
  handleChange = e => {
    return this.props.dispatch(updateSetting({ [e.target.name]: e.target.value }))
  }
  handleClick = e => {
    console.log('submitting password change')
  }
  render() {
    return (
      <section id='settings'>
        <h1>Security</h1>
        <h4>Password</h4>
        <div><Input name='oldPassword' placeholder='Old Password' onChange={this.handleChange} value={this.props.oldPassword} type='password' /></div>
        <div><Input name='newPassword' placeholder='New Password' onChange={this.handleChange} value={this.props.newPassword} type='password' /></div>
        <div><Input name='confirmNewPassword' placeholder='Confirm New Password' onChange={this.handleChange} value={this.props.confirmNewPassword} type='password' /></div>
        <Button text="Submit" onClick={this.handleClick} />
        <h4>Two-factor authentication</h4>
        {
          this.props.twofa ?
            <div>
              <p>Two-factor authentication currently set up for this account.</p>
              <Button text='Disable Two-factor' onClick={this.handleDisable} />
            </div>
            :
            <div>
              <p>Two-factor authentication is not currently set up for this account.</p>
              <p>Put in the phone number you want to use for authentication below.</p>
              <AddAuth />
              <Button text='Enable Two-factor' onClick={this.handleEnable} />
            </div>
        }
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    oldPassword: state.oldPassword,
    newPassword: state.newPassword,
    confirmNewPassword: state.confirmNewPassword,
    twofa: state.profile.twofa
  }
}
export default connect(mapStateToProps)(Security)
