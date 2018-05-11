import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import styles from './Users.less'

import { sendInvite } from '../../../../store/sites'
import { notify } from '../../../../../../../shell/store/notifications'
import { fetchSiteUsersPending } from '../../../../store/sitesUsers'

import UserRow from './UserRow'

export default class Users extends Component {
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
  render() {
    return (
      <div className={styles.Users}>
        <div className={styles.invite}>
          <Input
            className={styles.email}
            type="email"
            placeholder="Email of user to invite"
            name="inviteeEmail"
            value={this.state.inviteeEmail}
            onChange={this.handleEmail}
            required
          />
          <Select
            onSelect={this.handleRole}
            selection={this.state.selectedRole}
          >
            {Object.keys(this.props.roles).length ? (
              Object.keys(this.props.roles).map(ZUID => {
                return (
                  <Option
                    key={ZUID}
                    value={ZUID}
                    text={this.props.roles[ZUID].name}
                  />
                )
              })
            ) : (
              <Loader />
            )}
          </Select>
          <Button onClick={this.handleInvite} disabled={this.state.submitted}>
            <i className="fa fa-envelope-o" aria-hidden="true" />Send Invite
          </Button>
        </div>
        <Divider />
        <div className={styles.UserList}>
          <header>
            <h3>User Name</h3>
            <h3>Role</h3>
            <h3>Email</h3>
          </header>
          <main>
            {Object.keys(this.props.users).map(ZUID => {
              return (
                <UserRow
                  key={ZUID}
                  dispatch={this.props.dispatch}
                  {...this.props.users[ZUID]}
                />
              )
            })}
            {this.props.loadingUsers || this.props.loadingUsersPending ? (
              <Loader />
            ) : null}
          </main>
        </div>
      </div>
    )
  }
  handleInvite = evt => {
    if (this.state.inviteeEmail.includes('@')) {
      // needs mo betta validity check here
      this.setState({
        submitted: !this.state.submitted
      })
      this.props
        .dispatch(
          sendInvite({
            inviteeEmail: this.state.inviteeEmail,
            entityZUID: this.props.siteZUID,
            roleZUID: this.state.inviteRole
          })
        )
        .then(() => {
          // this.setState({
          //   submitted: false,
          //   inviteeEmail: ''
          // })
          this.props
            .dispatch(fetchSiteUsersPending(this.props.siteZUID))
            .then(() => {
              this.setState({
                submitted: false,
                inviteeEmail: ''
              })
            })
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
  handleEmail = evt => {
    this.setState({
      inviteeEmail: evt.target.value
    })
  }
  handleRole = evt => {
    this.setState({
      inviteRole: evt.target.value
    })
  }
}
