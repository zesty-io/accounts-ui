import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import styles from './UserAccess.less'

import { sendInvite, cancelInvite, removeUser } from '../../../../store/sites'
import { notify } from '../../../../../../../shell/store/notifications'
import { zConfirm } from '../../../../../../../shell/store/confirm'
import {
  fetchSiteUsers,
  fetchSiteUsersPending
  // removeSiteUser
} from '../../../../store/sitesUsers'
import { fetchSiteRoles } from '../../../../store/sitesRoles'

import UserAccessRow from './UserAccessRow'

class UserAccess extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
      inviteeEmail: '',
      inviteRole: '',
      selectedRole: {
        value: 'Select Role',
        text: 'Select Role'
      }
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchSiteUsers(this.props.site.ZUID))
    this.props.dispatch(fetchSiteUsersPending(this.props.site.ZUID))
    this.props.dispatch(fetchSiteRoles(this.props.site.ZUID))
  }
  render() {
    return (
      <WithLoader condition={Object.keys(this.props.roles).length}>
        <div className={styles.userAccess}>
          <div className={styles.invite}>
            <Input
              className={styles.email}
              type="email"
              placeholder="Email of user to invite"
              name="inviteeEmail"
              onChange={this.handleChange}
              required
              value={this.state.inviteeEmail}
            />
            <Select
              onSelect={this.handleChange}
              selection={this.state.selectedRole}
              options={Object.keys(this.props.roles).map(role => {
                return {
                  value: role.ZUID,
                  html: `<option name="inviteRole" value="${role.ZUID}">${
                    role.name
                  }</option>`
                }
              })}
            />
            <Button onClick={this.handleInvite} disabled={this.state.submitted}>
              Send Invite
            </Button>
          </div>
          <div className={styles.userTable}>
            <header>
              <h3>User Name</h3>
              <h3>Role</h3>
              <h3>Email</h3>
            </header>
            <main>
              {Object.keys(this.props.users).map(userZUID => {
                return (
                  <UserAccessRow
                    key={userZUID}
                    {...this.props.users[userZUID]}
                  />
                )
              })}
            </main>
          </div>
        </div>
      </WithLoader>
    )
  }
  handleInvite = evt => {
    if (this.state.inviteeEmail.includes('@')) {
      // needs mo betta validity check here
      this.setState({ submitted: !this.state.submitted })
      this.props
        .dispatch(
          sendInvite({
            inviteeEmail: this.state.inviteeEmail,
            entityZUID: this.props.site.ZUID,
            roleZUID: this.state.inviteRole
          })
        )
        .then(data => {
          this.props.dispatch(
            fetchSiteUsersPending(this.props.user.ZUID, this.props.site.ZUID)
          )
          this.setState({ submitted: !this.state.submitted, inviteeEmail: '' })
        })
    } else {
      this.props.dispatch(
        notify({
          HTML: `<p>
          <i class="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;Please provide a valid Email address
        </p>`,
          type: 'error'
        })
      )
    }
  }
  handleChange = evt => {
    if (evt.target.name === undefined) {
      this.setState({
        inviteRole: evt.currentTarget.dataset.value,
        selectedRole: {
          value: evt.currentTarget.dataset.value,
          text: evt.target.innerHTML
        }
      })
    } else {
      this.setState({ [evt.target.name]: evt.target.value })
    }
  }
}

export default withRouter(
  connect((state, ownProps) => {
    return {
      users: state.sitesUsers[ownProps.match.params.hash] || {},
      roles: state.sitesRoles[ownProps.match.params.hash] || {},
      site: state.sites[ownProps.match.params.hash] || {}
    }
  })(UserAccess)
)
