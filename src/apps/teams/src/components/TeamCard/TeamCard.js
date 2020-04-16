import React, { Component } from 'react'
import cx from 'classnames'

import {
  fetchTeamMembers,
  fetchTeamMemberInvites,
  inviteTeamMember,
  removeTeamMember
} from '../../store/teamMembers'
import { updateTeam, deleteTeam } from '../../store/teams'
import { declineTeamInvite, cancelTeamInvite } from '../../store/teamInvites'
import { fetchTeamInstances } from '../../store/teamInstances'

import { zConfirm } from '../../../../../shell/store/confirm'
import { notify } from '../../../../../shell/store/notifications'

import { WithLoader } from '@zesty-io/core/WithLoader'
import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { TextFieldType } from '@zesty-io/core/TextFieldType'
import { TextareaFieldType } from '@zesty-io/core/TextareaFieldType'
import { Input } from '@zesty-io/core/Input'
import { AppLink } from '@zesty-io/core/AppLink'
import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Button } from '@zesty-io/core/Button'

import styles from './TeamCard.less'
export default class TeamCard extends Component {
  state = {
    name: this.props.team.name,
    description: this.props.team.description,
    inviteeEmail: '',
    admin: false,
    editing: false,
    loaded: false,
    submitted: false
  }
  componentDidMount() {
    Promise.all([
      this.props.dispatch(fetchTeamMembers(this.props.team.ZUID)),
      this.props.dispatch(fetchTeamMemberInvites(this.props.team.ZUID)),
      this.props.dispatch(fetchTeamInstances(this.props.team.ZUID))
    ])
      .then(() => {
        const isAdmin = Boolean(
          this.props.user.staff ||
            this.props.members
              .filter(member => member)
              .find(member => {
                return member.ZUID === this.props.user.ZUID && member.admin
              })
        )
        this.setState({
          loaded: true,
          isAdmin
        })
      })
      .catch(() => {
        this.setState({
          loaded: true
        })
        this.props.dispatch(
          notify({ message: 'Error fetching team data', type: 'error' })
        )
      })
  }
  render() {
    const { team, instances } = this.props
    return (
      <Card className={styles.TeamCard}>
        <CardHeader className={styles.CardHeader}>
          <i
            className={cx(styles.copy, 'fa fa-clipboard')}
            title="Click to copy team ID"
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
            }}
          />
          &nbsp;
          <span className={styles.ZUID}>{team.ZUID}</span>
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <section className={styles.Settings}>
            {this.state.isAdmin && (
              <i
                className={cx(
                  styles.Edit,
                  this.state.editing ? 'fas fa-window-close' : 'fas fa-cog'
                )}
                title="Edit team settings"
                onClick={this.handleEdit}
              />
            )}
            {this.state.editing ? (
              <div className={styles.Editing}>
                <TextFieldType
                  name="name"
                  label="Team Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <TextareaFieldType
                  name="description"
                  label="Team Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />

                <ButtonGroup className={styles.actions}>
                  <Button
                    className={styles.Save}
                    kind="secondary"
                    onClick={this.handleUpdateTeam}>
                    <i className="fas fa-save" aria-hidden="true" />
                    Update Team
                  </Button>
                  <Button
                    className={styles.Delete}
                    type="warn"
                    onClick={this.handleDeleteTeam}>
                    <i className="fas fa-trash-alt" aria-hidden="true" />
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

          <WithLoader condition={this.state.loaded}>
            <section className={styles.Members}>
              <h3>Owners</h3>

              {this.props.members.length
                ? this.props.members
                    .filter(
                      member =>
                        member.ZUID === this.props.team.createdByUserZUID
                    )
                    .map((member, i) => {
                      return (
                        <article className={styles.Member} key={i}>
                          <i
                            className="fa fa-lock"
                            aria-hidden="true"
                            title="Team owner"
                          />
                          <span className={styles.Name}>{member.email}</span>
                        </article>
                      )
                    })
                : 'Team is missing an owner'}
            </section>

            <section className={styles.Members}>
              <h3>Members</h3>
              {this.props.members.length
                ? this.props.members
                    .filter(
                      member =>
                        member.ZUID !== this.props.team.createdByUserZUID
                    )
                    .map((member, i) => {
                      return (
                        <article className={styles.Member} key={i}>
                          {member.invitedByUserZUID ? (
                            <i className="fas fa-clock" />
                          ) : (
                            <i className="fas fa-user" />
                          )}

                          <span className={styles.Name}>
                            {member.invitedByUserZUID
                              ? member.inviteeEmail
                              : member.email}
                          </span>

                          {this.state.isAdmin ? (
                            <i
                              className={cx(styles.Remove, 'fas fa-user-slash')}
                              onClick={() => {
                                if (member.inviteeEmail) {
                                  this.handleCancelInvite(
                                    this.props.team.ZUID,
                                    member.ZUID
                                  )
                                } else {
                                  this.handleRemoveMember(
                                    this.props.team.ZUID,
                                    member.ZUID
                                  )
                                }
                              }}
                            />
                          ) : null}
                        </article>
                      )
                    })
                : 'No members for this team'}
            </section>

            <section className={styles.Instances}>
              <h3>Instances</h3>
              {instances && Object.keys(instances).length
                ? Object.keys(instances).map(instance => {
                    return (
                      <article
                        className={styles.Instance}
                        key={instances[instance].ZUID}>
                        <AppLink to={`/instances/${instances[instance].ZUID}`}>
                          {/* <i className="fa fa-globe" /> */}
                          {instances[instance].name}
                        </AppLink>
                      </article>
                    )
                  })
                : 'No instances for this team'}
            </section>
          </WithLoader>
        </CardContent>
        <CardFooter className={styles.CardFooter}>
          {this.state.isAdmin && (
            <form className={styles.CardInvite} onSubmit={this.handleInvite}>
              <div>
                <Input
                  required
                  type="text"
                  name="inviteeEmail"
                  placeholder="Enter your team members email address"
                  autoComplete="off"
                  value={this.state.inviteeEmail}
                  onChange={this.handleInviteEmail}
                />
              </div>
              <Button disabled={this.state.submitted} type="submit">
                <i className="fas fa-user-plus"></i>Invite
              </Button>
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

  handleUpdateTeam = evt => {
    evt.preventDefault()
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
        updateTeam(this.props.team.ZUID, {
          name: this.state.name || this.props.team.name,
          description: this.state.description || this.props.team.description
        })
      )
      .then(() => {
        this.props.dispatch(
          notify({
            type: 'success',
            message: `Updated team ${this.props.team.name}`
          })
        )
        this.setState({
          editing: false
        })
      })
      .catch(err => {
        console.error(err)
        this.props.dispatch(
          notify({
            type: 'error',
            message: `Error updating ${this.props.team.name}`
          })
        )
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
        inviteTeamMember(
          this.props.team.ZUID,
          this.state.inviteeEmail,
          this.state.admin
        )
      )
      .then(() => {
        this.props.dispatch(
          notify({
            type: 'success',
            message: `Team invitation sent`
          })
        )
        this.setState({
          inviteeEmail: '',
          submitted: false
        })
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            type: 'error',
            message: `Invite error, no invite was sent`
          })
        )
        this.setState({
          submitted: false
        })
      })
  }

  handleDeleteTeam = evt => {
    evt.preventDefault()
    this.props.dispatch(
      zConfirm({
        kind: 'warn',
        prompt: `Are you sure you want to delete ${this.props.team.name}?`,
        callback: confirmed => {
          if (confirmed) {
            this.props
              .dispatch(deleteTeam(this.props.team.ZUID))
              .then(data => {
                this.props.dispatch(
                  notify({
                    type: 'success',
                    message: `Deleted team ${this.props.team.name}`
                  })
                )
              })
              .catch(err => {
                this.props.dispatch(
                  notify({
                    type: 'error',
                    message: `Error deleting team ${this.props.team.name}`
                  })
                )
              })
          }
        }
      })
    )
  }

  handleRemoveMember = (teamZUID, userZUID) => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to remove this user?',
        callback: confirmed => {
          if (confirmed) {
            this.props
              .dispatch(removeTeamMember(teamZUID, userZUID))
              .then(data => {
                this.props.dispatch(
                  notify({
                    type: 'success',
                    message: 'User successfully removed'
                  })
                )
              })
              .catch(err => {
                this.props.dispatch(
                  notify({
                    type: 'error',
                    message: 'An error occurred removing this user'
                  })
                )
              })
          }
        }
      })
    )
  }

  handleCancelInvite = (teamZUID, inviteZUID) => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to cancel this invite?',
        callback: confirmed => {
          if (confirmed) {
            this.props
              .dispatch(cancelTeamInvite(teamZUID, inviteZUID, 'cancel'))
              .then(() => {
                this.props.dispatch(
                  notify({
                    type: 'success',
                    message: 'Users team invitation successfully canceled'
                  })
                )
              })
              .catch(err => {
                this.props.dispatch(
                  notify({
                    type: 'error',
                    message:
                      'An error occurred canceling this users team invitation'
                  })
                )
              })
          }
        }
      })
    )
  }
}
