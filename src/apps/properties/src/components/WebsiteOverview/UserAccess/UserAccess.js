import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './style.less'

import { sendInvite, cancelInvite, removeUser } from '../../../store/sites'
import { notify } from '../../../../../../shell/store/notifications'
import { zConfirm } from '../../../../../../shell/store/confirm'
import {
  fetchSiteUsersPending,
  fetchSiteUser,
  removeSiteUser
} from '../../../store/sitesUsers'

class UserAccess extends Component {
  constructor(props) {
    super()
    this.state = {
      submitted: false,
      inviteeEmail: '',
      inviteRole: ''
    }
  }
  removeUser = (userZUID, roleZUID) => {
    this.props
      .dispatch(removeUser(userZUID, roleZUID))
      .then(data => {
        this.props.dispatch(
          notify({
            message: 'User Removed',
            type: 'success'
          })
        )
        this.props.dispatch(removeSiteUser(userZUID, this.props.siteZUID))
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            message: 'Error Removing User',
            type: 'error'
          })
        )
      })
  }
  cancelInvite = inviteZUID => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to cancel this invite?',
        callback: result => {
          if (result) {
            // removes user if confirmed
            this.props.dispatch(cancelInvite(inviteZUID)).then(data => {
              this.props.dispatch(
                removeSiteUser(data.data.ZUID, this.props.site.ZUID)
              )
            })
          }
        }
      })
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
    // todo: validity check
    this.setState({ [evt.target.name]: evt.target.value })
  }
  render() {
    return this.props.sitesRoles ? (
      <div className={styles.userAccess}>
        <div className={styles.invite}>
          <Input
            className={styles.email}
            type="email"
            placeholder="Email of user to invite"
            name="inviteeEmail"
            required
            value={this.state.inviteeEmail}
            onChange={this.handleChange}
          />
          <select name="inviteRole" onChange={this.handleChange}>
            <option value="none">Select Role for User</option>
            {this.props.sitesRoles[this.props.siteZUID] instanceof Object &&
              Object.keys(this.props.sitesRoles[this.props.siteZUID]).map(
                (roleZUID, i) => {
                  if (
                    this.props.sitesRoles[this.props.siteZUID][roleZUID]
                      .name === 'SYSTEM_ROLE'
                  ) {
                    return
                  } else {
                    return (
                      <option
                        key={i}
                        value={
                          this.props.sitesRoles[this.props.siteZUID][roleZUID]
                            .ZUID
                        }>
                        {
                          this.props.sitesRoles[this.props.siteZUID][roleZUID]
                            .name
                        }
                      </option>
                    )
                  }
                }
              )}
          </select>
          {/* <Select
            onChange={this.handleChange}
            name="inviteRole"
            selection={{
              value: "Select Role",
              html: '<option value="none">Select Role</option>'
            }}
            options={
              this.props.sitesRoles[this.props.siteZUID] instanceof Object ?
              Object.keys(this.props.sitesRoles[this.props.siteZUID]).map((roleZUID, i) => {
                  return {
                    value: this.props.sitesRoles[this.props.siteZUID][roleZUID].ZUID,
                    html: `<option value="${this.props.sitesRoles[this.props.siteZUID][roleZUID].ZUID}">${this.props.sitesRoles[this.props.siteZUID][roleZUID].name}</option>`
                  };
                  }) : []
            }
          /> */}
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
            {this.props.sitesUsers[this.props.siteZUID] instanceof Object ? (
              Object.keys(this.props.sitesUsers[this.props.siteZUID]).map(
                (user, i) => {
                  return (
                    <article key={i}>
                      <span>
                        {
                          this.props.sitesUsers[this.props.siteZUID][user]
                            .firstName
                        }{' '}
                        {
                          this.props.sitesUsers[this.props.siteZUID][user]
                            .lastName
                        }
                        {!this.props.sitesUsers[this.props.siteZUID][user]
                          .lastName &&
                          !this.props.sitesUsers[this.props.siteZUID][user]
                            .firstName && <em>Invited User</em>}
                      </span>
                      <span>
                        {this.props.sitesUsers[this.props.siteZUID][user]
                          .pending ? (
                          <Button onClick={() => this.cancelInvite(user)}>
                            Cancel Invitation
                          </Button>
                        ) : (
                          this.props.sitesUsers[this.props.siteZUID][user].role
                            .name
                        )}
                      </span>
                      <span>
                        {this.props.sitesUsers[this.props.siteZUID][user].email}{' '}
                      </span>
                      <span>
                        {!this.props.sitesUsers[this.props.siteZUID][user]
                          .pending ? (
                          <Button
                            onClick={() =>
                              this.removeUser(
                                user,
                                this.props.sitesUsers[this.props.siteZUID][user]
                                  .role.ZUID
                              )
                            }>
                            Remove User
                          </Button>
                        ) : null}
                      </span>
                    </article>
                  )
                }
              )
            ) : (
              <Loader />
            )}
          </main>
        </div>
      </div>
    ) : (
      <Loader />
    )
  }
}

const mapStateToProps = state => {
  return {
    sitesRoles: state.sitesRoles,
    sitesUsers: state.sitesUsers,
    user: state.user
  }
}

export default connect(state => state)(UserAccess)
