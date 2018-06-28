import React, { Component } from 'react'
import {
  updateTeam,
  inviteMember,
  deleteTeam,
  getTeamMembers,
  getTeamInstances,
  getTeamPendingInvites,
  handleTeamInvite,
  removeMember
} from '../../store'
import { zConfirm } from '../../../../../shell/store/confirm'
import { notify } from '../../../../../shell/store/notifications'

import styles from './TeamCard.less'

class TeamCard extends Component {
  state = {
    name: '',
    description: '',
    inviteeEmail: '',
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
      this.setState({ loaded: true })
    })
  }
  render() {
    const { team } = this.props
    return (
      <Card className={styles.Card}>
        <CardHeader className={styles.CardHeader}>
          <h1>
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
            {this.props.isAdmin && (
              <i
                className={
                  this.state.editing
                    ? `fa fa-times-circle-o ${styles.Edit}`
                    : `fa fa-pencil ${styles.Edit}`
                }
                onClick={() => this.setState({ editing: !this.state.editing })}
              />
            )}
          </h1>
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
          <React.Fragment>
            <section className={styles.InviteCode}>
              <h3>invite code: </h3>
              {team.ZUID} <i className="fa fa-copy" />
            </section>
            <small>use this code for an invitation to an instance</small>
          </React.Fragment>
          {this.props.isAdmin && (
            <i
              className={`fa fa-trash ${styles.trash}`}
              onClick={this.handleDeleteTeam}
            />
          )}
        </CardHeader>
        <CardContent>
          <h3>Members</h3>
          <WithLoader
            condition={this.state.loaded}
            message="Loading team members">
            {team.members
              ? team.members.map(member => {
                  if (!member.invitedByUserZUID) {
                    return (
                      <article className={styles.CardContent} key={member.ZUID}>
                        <p title={member.email}>
                          <i className="fa fa-user" />
                          {member.firstName} {member.lastName}
                          {member.admin ? <i className="fa fa-star" /> : null}
                        </p>
                        {this.props.isAdmin && (
                          <i
                            className={`${styles.remove} fa fa-times-circle-o`}
                            onClick={() => this.removeUser(member.ZUID)}
                          />
                        )}
                      </article>
                    )
                  } else {
                    return (
                      <article className={styles.CardContent} key={member.ZUID}>
                        <p title={member.inviteeEmail}>
                          <i className="fa fa-clock-o" />
                          {member.inviteeEmail} <i>(pending)</i>
                        </p>
                        {this.props.isAdmin && (
                          <i
                            className={`${styles.remove} fa fa-times-circle-o`}
                            onClick={() => this.cancelInvite(member.ZUID)}
                          />
                        )}
                      </article>
                    )
                  }
                })
              : 'no members for this team'}
          </WithLoader>
          <h3>Instances</h3>
          <WithLoader
            condition={this.state.loaded}
            message="Loading team instances">
            {team.instances && team.instances.length
              ? team.instances.map(instance => {
                  return (
                    <article className={styles.Instance} key={instance.ZUID}>
                      <p>
                        <i className="fa fa-globe" />
                        {instance.name}
                      </p>
                      <p>role: {instance.role}</p>
                    </article>
                  )
                })
              : 'No Instances for this team'}
          </WithLoader>
        </CardContent>
        <CardFooter className={styles.CardInvite}>
          {this.props.isAdmin && (
            <React.Fragment>
              <Button
                disabled={this.state.submitted}
                onClick={this.handleInvite}>
                <i className="fa fa-envelope-o" />
                Invite
              </Button>
              <Input
                type="text"
                required
                value={this.state.inviteeEmail}
                onChange={this.handleChange}
                name="inviteeEmail"
                placeholder="new@teammember.com"
                autoComplete="off"
              />
            </React.Fragment>
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
  handleUpdateName = () => {
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
    this.setState({ submitted: true })
    this.props
      .dispatch(inviteMember(this.props.team.ZUID, this.state.inviteeEmail))
      .then(() => this.setState({ inviteeEmail: '', submitted: false }))
  }
  handleDeleteTeam = evt => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to delete this team?',
        callback: confirmed => {
          if (confirmed) {
            this.props
              .dispatch(deleteTeam(this.props.team.ZUID))
              .then(() => {
                this.props.dispatch(
                  notify({
                    type: 'success',
                    message: 'Team deleted'
                  })
                )
              })
              .catch(err => {
                console.error(err)
              })
          }
        }
      })
    )
  }
  removeUser = userZUID => {
    //TODO: add confirmation
    // confirm, then remove team member
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to remove this user?',
        callback: confirmed => {
          if (confirmed) {
            this.props.dispatch(
              notify({
                type: 'success',
                message: 'User successfully removed'
              })
            )
            this.props
              .dispatch(removeMember(this.props.team.ZUID, userZUID))
              .then(data => {
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
            this.props.dispatch(handleTeamInvite(user, 'cancel')).then(data => {
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

export default TeamCard
