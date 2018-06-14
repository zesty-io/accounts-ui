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
  render() {
    return (
      <Card>
        <CardHeader>
          <h1>Your Profile</h1>
        </CardHeader>
        <CardContent className={styles.Profile}>
          <div className={styles.gravatar}>
            <h4>Gravatar</h4>
            <img
              className={styles.avatar}
              src={`https://www.gravatar.com/avatar/${
                this.props.profile.emailHash
              }?d=mm&s=80`}
            />
          </div>
          <h4>User Name</h4>
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
        </CardContent>
        <CardFooter>
          <Button
            onClick={this.handleClick}
            className={styles.ProfileSave}
            disabled={this.state.submitted}
          >
            <i className="fa fa-floppy-o" aria-hidden="true" />
            Update User Name
          </Button>
        </CardFooter>
      </Card>
    )
  }
  handleClick = evt => {
    evt.preventDefault()
    this.setState({ submitted: !this.state.submitted })
    this.props
      .dispatch(saveProfile())
      .then(data => {
        this.props.dispatch(
          notify({
            HTML: `<i class="fa fa-check-square-o" aria-hidden="true"></i>&nbsp;Name updated to ${
              this.props.profile.firstName
            } ${this.props.profile.lastName}`,
            type: 'success'
          })
        )
        this.setState({ submitted: !this.state.submitted })
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            HTML: `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp;Error saving data ${err}`,
            type: 'error'
          })
        )
        this.setState({ submitted: !this.state.submitted })
      })
  }
  handleChange = evt => {
    this.props.dispatch(updateProfile({ [evt.target.name]: evt.target.value }))
  }
}

export default connect(state => {
  return {
    profile: state.user,
    userZUID: state.user.ZUID
  }
})(Profile)
