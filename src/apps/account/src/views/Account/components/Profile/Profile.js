import { Component } from 'react'
import { connect } from 'react-redux'
import { notify } from '../../../../../../../shell/store/notifications'
import {
  updateProfile,
  saveProfile
} from '../../../../../../../shell/store/user'

import styles from './Profile.less'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      submitted: false
    }
  }
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
      <article className={styles.Profile}>
        <header>
          <h2>Your Profile</h2>
        </header>
        <main>
          <div className={styles.gravatar}>
            <h3>Gravatar</h3>
            <img
              className={styles.avatar}
              src={`https://www.gravatar.com/avatar/${
                this.props.profile.emailHash
              }?d=mm&s=80`}
            />
          </div>

          <h3>Name</h3>
          <Input
            type="text"
            value={this.props.profile.firstName}
            onChange={this.handleChange}
            placeholder="Enter your first name"
            name="firstName"
          />
          <Input
            type="text"
            value={this.props.profile.lastName}
            onChange={this.handleChange}
            placeholder="Enter your last name"
            name="lastName"
          />
        </main>
        <footer>
          <Button
            onClick={this.handleClick}
            className={styles.ProfileSave}
            disabled={this.state.submitted}
          >
            <i className="fa fa-floppy-o" aria-hidden="true" />
            Set Name
          </Button>
        </footer>
      </article>
    )
  }
}

export default connect(state => {
  return { profile: state.user, userZUID: state.user.ZUID }
})(Profile)
