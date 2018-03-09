import React, { Component } from 'react'
import { connect } from 'react-redux'

import {modifyProfile} from '../../store'

class Profile extends Component {
  constructor(props) {
    super()
    this.state = {
      loading: true,
    }
  }
  handleClick(e) {
    e.preventDefault()
    this.props.dispatch(modifyProfile(this.state))
  }
  componentWillReceiveProps(next) {
    this.setState({...next.settings.profile, loading: false})
  }
  render() {
    return (
      <section id='UserSettings'>
        <h2>Profile</h2>
        {this.state.loading === false ?
        <form id="update-my-info" method="POST">
          <div className="field">
            <label>First Name</label>
            <Input type="text" name="first_name" className="required valid" value={this.state.firstName} onChange={e => this.setState({...this.state, firstName: e.target.value})}/>
          </div>
          <div className="field">
            <label>Last Name</label>
            <Input type="text" name="last_name" value={this.state.lastName} onChange={e => this.setState({...this.state, lastName: e.target.value})}/>
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

export default connect(state => state)(Profile)
