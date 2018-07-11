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
} from '../../store/teams'

import { zConfirm } from '../../../../../shell/store/confirm'
import { notify } from '../../../../../shell/store/notifications'

import styles from './TeamCard.less'

export default class TeamCard extends Component {
  state = {
    inviteeEmail: '',
    admin: false,
    editing: false,
    loaded: false,
    submitted: false
  }
  componentDidMount() {
    // TODO: an individual loading state for each
    Promise.all([
      this.props.dispatch(getTeamMembers(this.props.team.ZUID))
      // this.props.dispatch(getTeamInstances(this.props.team.ZUID))
    ]).then(() => {
      this.props.dispatch(getTeamPendingInvites(this.props.team.ZUID))
      const isAdmin = Boolean(
        this.props.team.members.find(user => {
          return user.ZUID === this.props.userZUID && user.admin
        })
      )
      this.setState({
        loaded: true,
        isAdmin
      })
    })
  }
  render() {
    const { team } = this.props
    return (
      <Card className={styles.TeamCard}>
        <CardHeader className={styles.CardHeader}>
          <Button
            title="Click to copy team ID"
            className={styles.Copy}
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
                    message: 'Failed to copy the team ID to your clipboard'
                  })
                )
              }
              this.props.dispatch(
                notify({
                  type: 'success',
                  message: `Copied team ID ${team.ZUID} to your clipboard`
                })
              )
            }}>
            <i className={cx(styles.copy, 'fa fa-clipboard')} />
            Copy ID
          </Button>
          <span className={styles.ZUID}>{team.ZUID}</span>
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <section className={styles.Settings}>
            {this.state.isAdmin && (
              <i
                className={cx(
                  styles.Edit,
                  this.state.editing ? 'fa fa-ban' : 'fa fa-cog'
                )}
                title="Edit team settings"
                onClick={this.handleEdit}
              />
            )}
            {this.state.editing ? (
              <div className={styles.Editing}>
                <label>
                  Team Name:{' '}
                  <Input
                    type="text"
                    placeholder="New team name"
                    onChange={this.handleChange}
                    name="name"
                  />
                </label>
                <label>
                  Team Description:
                  <textarea
                    placeholder="New team description"
                    onChange={this.handleChange}
                    name="description"
                  />
                </label>
                <ButtonGroup>
                  <Button
                    className={styles.Save}
                    type="save"
                    onClick={this.handleUpdateTeam}>
                    <i className="fa fa-floppy-o" aria-hidden="true" />
                    Update Team
                  </Button>
                  <Button
                    className={styles.Delete}
                    type="warn"
                    onClick={this.handleDeleteTeam}>
                    <i className="fa fa-trash-o" aria-hidden="true" />
                  </Button>
                </ButtonGroup>
              </div>
            ) : (
              <React.Fragment>
                <h3>{this.props.team.name}</h3>
                <p>{this.props.team.description}</p>
              </React.Fragment>
            )}
          </section>

          <section className={styles.Members}>
            <h3>Members</h3>
            <WithLoader
              condition={this.state.loaded}
              message="Loading team members">
              {team.members
                ? team.members.map(member => {
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
                            : member.email}
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
                : 'No members for this team'}
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
                : 'No instances for this team'}
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
                required
                type="text"
                name="inviteeEmail"
                placeholder="team-member@acme.com"
                autoComplete="off"
                value={this.state.inviteeEmail}
                onChange={this.handleInviteEmail}
              />
            </form>
          )}
        </CardFooter>
      </Card>
    )
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleEdit = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleInviteEmail = evt => {
    this.setState({
      inviteeEmail: evt.target.value
    })
  }

  handleUpdateTeam = () => {
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
        this.setState({
          editing: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          editing: false
        })
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
        this.setState({
          inviteeEmail: '',
          submitted: false
        })
      })
  }
  handleDeleteTeam = evt => {
    evt.preventDefault()
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
                    message: `Deleted team ${this.props.team.ZUID}`
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
