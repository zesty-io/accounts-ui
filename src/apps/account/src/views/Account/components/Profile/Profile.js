import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Profile.less'

import {
  updateProfile,
  saveProfile,
  fetchUser
} from '../../../../../../../shell/store/user'

import { notify } from '../../../../../../../shell/store/notifications'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      submitted: false
    }
  }
  // componentDidMount() {
  //   this.props.dispatch(fetchUser(this.props.userZUID))
  // }
  handleClick = evt => {
    evt.preventDefault()
    this.setState({ submitted: !this.state.submitted })
    this.props
      .dispatch(saveProfile())
      .then(data => {
        this.props.dispatch(
          notify({
            HTML: `<p>
        <i class="fa fa-check-square-o" aria-hidden="true" />&nbsp;Name changed to <i>
        ${this.props.profile.firstName}
        ${this.props.profile.lastName}</i>
      </p>`,
            type: 'success'
          })
        )
        this.setState({ submitted: !this.state.submitted })
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            HTML: `<p>
        <i class="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;Error saving data ${err}
      </p>`,
            type: 'error'
          })
        )
        this.setState({ submitted: !this.state.submitted })
      })
  }
  handleChange = evt => {
    this.props.dispatch(updateProfile({ [evt.target.name]: evt.target.value }))
  }
  render() {
    return (
      <section className={styles.Profile}>
        <h2>User Name</h2>

        <div className={styles.field}>
          {/* <div>
            <label>First Name</label>
          </div> */}
          <Input
            type="text"
            value={this.props.profile.firstName}
            onChange={this.handleChange}
            placeholder="Enter your first name"
            name="firstName"
          />
        </div>
        <div>
          {/* <div>
            <label>Last Name</label>
          </div> */}
          <Input
            type="text"
            value={this.props.profile.lastName}
            onChange={this.handleChange}
            placeholder="Enter your last name"
            name="lastName"
          />
        </div>
        <Button
          onClick={this.handleClick}
          className={styles.ProfileSave}
          disabled={this.state.submitted}
          text="Set Name"
        />
      </section>
    )
  }
}

export default connect(state => {
  return { profile: state.user, userZUID: state.user.ZUID }
})(Profile)
