import React, { Component } from 'react'
import cx from 'classnames'

import {
  updateTeam,
  inviteMember,
  deleteTeam,
  getTeamMembers,
  getTeamInstances,
  getTeamPendingInvites,
  handleTeamInvite,
  removeMember,
  modifyUser
} from '../../store'

import { zConfirm } from '../../../../../shell/store/confirm'
import { notify } from '../../../../../shell/store/notifications'

import styles from './TeamCard.less'

export default class TeamCard extends Component {
  state = {
    name: '',
    description: '',
    inviteeEmail: '',
    admin: false,
    editing: false,
    loaded: false,
    submitted: false
  }
  componentDidMount() {
    this.setState({
      name: this.props.team.name,
      description: this.props.team.description
    })
    // TODO: an individual loading state for each
    Promise.all([
      this.props.dispatch(getTeamMembers(this.props.team.ZUID)),
      this.props.dispatch(getTeamInstances(this.props.team.ZUID))
    ]).then(() => {
      this.props.dispatch(getTeamPendingInvites(this.props.team.ZUID))
      const isAdmin = Boolean(
        this.props.team.members.find(user => {
          return user.ZUID === this.props.userZUID && user.admin
        })
      )
      this.setState({ loaded: true, isAdmin })
    })
  }
  render() {
    const { team } = this.props
    return (
      <Card className={styles.TeamCard}>
        <CardHeader className={styles.CardHeader}>
          <h3>
            {this.state.editing ? (
              <React.Fragment>
                <Input
                  value={this.state.name}
                  onChange={this.handleChange}
                  name="name"
                  type="text"
                />
                <i className="fa fa-save" onClick={this.handleUpdateName} />
              </React.Fragment>
            ) : (
              team.name
            )}{' '}
            {this.state.isAdmin && (
              <i
                className={
                  this.state.editing
                    ? `fa fa-times-circle-o ${styles.Edit}`
                    : `fa fa-pencil ${styles.Edit}`
                }
                onClick={() => this.setState({ editing: !this.state.editing })}
              />
            )}
          </h3>

          <React.Fragment>
            <section className={styles.InviteCode}>
              <h4>
                ID:&nbsp;
                <span className={styles.ZUID}>{team.ZUID}</span>
                <i
                  className={`fa fa-copy ${styles.copy}`}
                  onClick={e => {
                    const input = document.createElement('input')
                    document.body.appendChild(input)
                    input.value = team.ZUID
                    input.focus()
                    input.select()
                    const result = document.execCommand('copy')
                    input.remove()
                    if (result === 'unsuccessful') {
                      return this.props.dispatch(
                        notify({
                          type: 'error',
                          message: 'failed to copy'
                        })
                      )
                    }
                    this.props.dispatch(
                      notify({
                        type: 'success',
                        message: 'Copied to clipboard'
                      })
                    )
                  }}
                />
              </h4>
            </section>
            {/* <small>use this code for an invitation to an instance</small> */}
          </React.Fragment>

          {this.state.editing ? (
            <textarea
              rows="4"
              cols="50"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          ) : (
            <p>{this.state.description}</p>
          )}

          {this.state.isAdmin && (
            <i
              className={`fa fa-trash ${styles.trash}`}
              onClick={this.handleDeleteTeam}
            />
          )}
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <section className={styles.Members}>
            <h3>Members</h3>
            <WithLoader
              condition={this.state.loaded}
              message="Loading team members">
              {team.members
                ? team.members.map(member => {
                    console.log(member)
                    return (
                      <article className={styles.Member} key={member.ZUID}>
                        {member.admin ? (
                          <i
                            className="fa fa-lock"
                            aria-hidden="true"
                            title="Team owner"
                          />
                        ) : member.invitedByUserZUID ? (
                          <i className="fa fa-clock-o" />
                        ) : (
                          <i className="fa fa-user" />
                        )}

                        <span className={styles.Name}>
                          {member.invitedByUserZUID
                            ? member.inviteeEmail
                            : `${member.firstName} ${member.lastName}`}
                        </span>

                        {!member.admin && this.state.isAdmin ? (
                          <i
                            className={cx(
                              styles.Remove,
                              'fa fa-times-circle-o'
                            )}
                            onClick={() => this.removeUser(member.ZUID)}
                          />
                        ) : null}
                      </article>
                    )
                  })
                : 'no members for this team'}
            </WithLoader>
          </section>

          <section className={styles.Instances}>
            <h3>Instances</h3>
            <WithLoader
              condition={this.state.loaded}
              message="Loading team instances">
              {team.instances && team.instances.length
                ? team.instances.map(instance => {
                    return (
                      <article className={styles.Instance} key={instance.ZUID}>
                        <AppLink to={`/instances/${instance.ZUID}`}>
                          <i className="fa fa-globe" />
                          {instance.name}
                        </AppLink>
                      </article>
                    )
                  })
                : 'No Instances for this team'}
            </WithLoader>
          </section>
        </CardContent>
        <CardFooter>
          {this.state.isAdmin && (
            <form className={styles.CardInvite} onSubmit={this.handleInvite}>
              <Button disabled={this.state.submitted} type="submit">
                <i className="fa fa-envelope-o" />
                Invite
              </Button>
              <Input
                type="text"
                required
                value={this.state.inviteeEmail}
                onChange={this.handleChange}
                name="inviteeEmail"
                placeholder="new@team-member.com"
                autoComplete="off"
              />
              {/* <section className={styles.admin}>
                <Toggle name="admin" onChange={this.handleChange} />
                <small>Admin</small>
              </section> */}
            </form>
          )}
        </CardFooter>
      </Card>
    )
  }
  handleChange = evt => {
    if (evt.target.name === 'admin') {
      return this.setState({ admin: evt.target.checked ? true : false })
    }
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleUpdateName = () => {
    if (this.state.name.length > 50) {
      return this.props.dispatch(
        notify({
          type: 'error',
          message: 'Team name must be less than 50 characters'
        })
      )
    }
    if (this.state.description.length > 100) {
      return this.props.dispatch(
        notify({
          type: 'error',
          message: 'Team description must be less than 100 characters'
        })
      )
    }
    this.props
      .dispatch(
        updateTeam(
          this.props.team.ZUID,
          this.state.name,
          this.state.description
        )
      )
      .then(() => {
        this.setState({ editing: false })
      })
  }
  handleInvite = evt => {
    evt.preventDefault()
    this.setState({ submitted: true })
    this.props
      .dispatch(
        inviteMember(
          this.props.team.ZUID,
          this.state.inviteeEmail,
          this.state.admin
        )
      )
      .then(() => {
        this.setState({ inviteeEmail: '', submitted: false })
      })
  }
  handleDeleteTeam = evt => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to delete this team?',
        callback: confirmed => {
          if (confirmed) {
            this.props
              .dispatch(deleteTeam(this.props.team.ZUID))
              .then(data => {
                this.props.dispatch(
                  notify({
                    type: 'success',
                    message: 'Team deleted'
                  })
                )
              })
              .catch(err => {
                this.props.dispatch(
                  notify({
                    type: 'error',
                    message: 'Error deleting team'
                  })
                )
              })
          }
        }
      })
    )
  }
  // handleAdminChange = (userZUID, admin) => {
  //   this.state.isAdmin &&
  //     this.props.dispatch(
  //       zConfirm({
  //         prompt: admin
  //           ? 'Are you sure you want to make this user an Admin?'
  //           : 'Are you sure you want to remove this users admin status?',
  //         callback: confirmed => {
  //           if (confirmed) {
  //             this.props
  //               .dispatch(modifyUser(this.props.team.ZUID, userZUID, admin))
  //               .then(data => {
  //                 this.props.dispatch(
  //                   notify({
  //                     type: 'success',
  //                     message: admin
  //                       ? 'Successfully made user admin'
  //                       : 'Successfully removed admin privileges'
  //                   })
  //                 )
  //               })
  //               .catch(() => {
  //                 this.props.dispatch(
  //                   notify({
  //                     type: 'error',
  //                     message: 'Unable to update admin'
  //                   })
  //                 )
  //               })
  //           }
  //         }
  //       })
  //     )
  // }
  removeUser = userZUID => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to remove this user?',
        callback: confirmed => {
          if (confirmed) {
            this.props
              .dispatch(removeMember(this.props.team.ZUID, userZUID))
              .then(data => {
                this.props.dispatch(
                  notify({
                    type: 'success',
                    message: 'User successfully removed'
                  })
                )
                this.props.dispatch({
                  type: 'REMOVE_TEAM_MEMBER',
                  userZUID,
                  teamZUID: this.props.team.ZUID
                })
              })
          }
        }
      })
    )
  }
  cancelInvite = user => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to cancel this invite?',
        callback: confirmed => {
          if (confirmed) {
            this.props
              .dispatch(handleTeamInvite(user, this.props.team.ZUID, 'cancel'))
              .then(data => {
                this.props.dispatch({
                  type: 'REMOVE_TEAM_MEMBER',
                  userZUID: user,
                  teamZUID: this.props.team.ZUID
                })
              })
          }
        }
      })
    )
  }
}
