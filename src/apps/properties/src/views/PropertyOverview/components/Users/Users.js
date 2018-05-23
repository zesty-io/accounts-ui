import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import styles from './Users.less'

import { sendInvite } from '../../../../store/sites'
import { notify } from '../../../../../../../shell/store/notifications'
import { fetchSiteUsersPending } from '../../../../store/sitesUsers'

import UserRow from './UserRow'
import UserPendingRow from './UserPendingRow'

export default class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
      inviteeEmail: '',
      inviteeRole: ''
    }
  }
  render() {
    return (
      <Card>
        <CardHeader>
          <h2>
            <i className="fa fa-users" aria-hidden="true" />
            &nbsp;User Access
          </h2>
        </CardHeader>
        <CardContent>
          <div className={styles.Users}>
            {this.props.isAdmin ? (
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
                <Select onSelect={this.handleSelectRole}>
                  <Option key="default" value="" text="Select Role" />
                  {this.props.siteRoles.map(role => {
                    return (
                      <Option
                        key={role.ZUID}
                        value={role.ZUID}
                        text={role.name}
                      />
                    )
                  })}
                </Select>
                <Button
                  onClick={this.handleInvite}
                  disabled={this.state.submitted}
                >
                  <i className="fa fa-envelope-o" aria-hidden="true" />Send
                  Invite
                </Button>
              </div>
            ) : null}

            <div className={styles.UserList}>
              <header>
                <h3>Name</h3>
                <h3>Email</h3>
                <h3>Role</h3>
              </header>
              <main>
                {this.props.loadingUsers || this.props.loadingUsersPending ? (
                  <Loader />
                ) : (
                  <div>
                    {Object.keys(this.props.users).map(ZUID => {
                      const user = this.props.users[ZUID]

                      if (user.pending) {
                        return (
                          <UserPendingRow
                            key={ZUID}
                            siteZUID={this.props.siteZUID}
                            siteRoles={this.props.siteRoles}
                            dispatch={this.props.dispatch}
                            isAdmin={this.props.isAdmin}
                            {...user}
                          />
                        )
                      } else {
                        return (
                          <UserRow
                            key={ZUID}
                            siteZUID={this.props.siteZUID}
                            siteRoles={this.props.siteRoles}
                            dispatch={this.props.dispatch}
                            isAdmin={this.props.isAdmin}
                            {...user}
                          />
                        )
                      }
                    })}
                  </div>
                )}
              </main>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  handleEmail = evt => {
    this.setState({
      inviteeEmail: evt.target.value
    })
  }
  handleSelectRole = evt => {
    this.setState({
      inviteeRole: evt.target.dataset.value
    })
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
            roleZUID: this.state.inviteeRole
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
}
