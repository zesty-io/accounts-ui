import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    updateSetting,
    saveProfile
  } from '../../store'

class Profile extends Component {
  handleClick = (e) => {
    e.preventDefault()
    this.props.dispatch(saveProfile())
  }
  handleChange = (e) => {
    this.props.dispatch(updateSetting( { [e.target.name]: e.target.value})) // need to flatten data for this to work
  }
  render() {
    return (
      <section id='UserSettings'>
        <h2>Profile</h2>
        <form id="update-my-info" method="POST">
          <div className="field">
            <label>First Name</label>
            <Input type="text" value={this.props.profile.firstName} onChange={this.handleChange} name='firstName' />
          </div>
          <div className="field">
            <label>Last Name</label>
            <Input type="text" value={this.props.profile.lastName} onChange={this.handleChange} name='lastName' />
          </div>
          <Button text="Save" onClick={this.handleClick}/>
        </form>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return { profile: state.profile }
}
export default connect(mapStateToProps)(Profile)
