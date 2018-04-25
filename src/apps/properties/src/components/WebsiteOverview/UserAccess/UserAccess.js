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
      inviteRole: '',
      selectedRole: {
        value: 'Select Role',
        html: '<option value="none">Select Role</option>'
      }
    }
  }
  removeUser = (userZUID, roleZUID) => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to remove this user?',
        callback: result => {
          if (result) {
            // removes user if confirmed
            if (result) {
              this.props
                .dispatch(removeUser(userZUID, roleZUID))
                .then(data => {
                  this.props.dispatch(
                    notify({
                      message: 'User Removed',
                      type: 'success'
                    })
                  )
                  this.props.dispatch(
                    removeSiteUser(userZUID, this.props.siteZUID)
                  )
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
          }
        }
      })
    )
  }
  cancelInvite = inviteZUID => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to cancel this invite?',
        callback: result => {
          if (result) {
            // removes invite if confirmed
            this.props.dispatch(cancelInvite(inviteZUID)).then(data => {
              this.props.dispatch(
                removeSiteUser(data.data.ZUID, this.props.site.ZUID)
              )
            })
            this.props.dispatch(
              notify({
                message: 'User Invite Cancelled',
                type: 'success'
              })
            )
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
    if (evt.target.name === undefined) {
      this.setState({
        inviteRole: evt.currentTarget.dataset.value,
        selectedRole: {
          value: evt.currentTarget.dataset.value,
          html: evt.target.innerHTML
        }
      })
    } else {
      this.setState({ [evt.target.name]: evt.target.value })
    }
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
            onChange={this.handleChange}
            required
            value={this.state.inviteeEmail}
          />
          {this.props.sitesRoles[this.props.siteZUID] instanceof Object ? (
            <Select
              onSelect={this.handleChange}
              selection={this.state.selectedRole}
              options={Object.entries(
                this.props.sitesRoles[this.props.siteZUID]
              ).map(roleKV => {
                return {
                  value: roleKV[0],
                  html: `<option name="inviteRole" value="${roleKV[0]}">${
                    roleKV[1].name
                  }</option>`
                }
              })}
            />
          ) : null}
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
                            className={styles.pullButton}
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
