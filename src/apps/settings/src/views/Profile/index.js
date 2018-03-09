import React, { Component } from 'react'
import { connect } from 'react-redux'

import {modifyProfile} from '../../store'

class Profile extends Component {
  constructor(props) {
    super()
    this.state = {      
    }
  }
  handleClick(e) {
    e.preventDefault()
    this.props.dispatch(modifyProfile(this.state))
  }
  render() {
    return (
      <section id='UserSettings'>
        <h2>Profile</h2>
        {this.props.profile ?
        <form id="update-my-info" method="POST">
          <div className="field">
            <label>First Name</label>
            <Input type="text" className="required valid" value={this.state.firstName || this.props.profile.firstName} onChange={e => this.setState({...this.state, firstName: e.target.value})}/>
          </div>
          <div className="field">
            <label>Last Name</label>
            <Input type="text" value={this.state.lastName || this.props.profile.lastName} onChange={e => this.setState({...this.state, lastName: e.target.value})}/>
          </div>
          <Button text="Save" onClick={e => this.handleClick(e)}/>
        </form>
        :
        <p>loading</p>
        }
      </section>
    )
  }
}

const mapStateToProps = state => {
  return { profile: state.settings.profile }
}
export default connect(mapStateToProps)(Profile)
