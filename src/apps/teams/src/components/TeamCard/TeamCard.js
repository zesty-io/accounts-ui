import React, { Component } from 'react'
import { updateTeam, inviteMember, deleteTeam } from '../../store'
import { zConfirm } from '../../../../../shell/store/confirm'
import { notify } from '../../../../../shell/store/notifications'

import styles from './TeamCard.less'

class TeamCard extends Component {
  state = {
    teamName: '',
    editing: false
  }
  componentDidMount() {
    this.setState({
      teamName: this.props.team.name,
      isAdmin: this.props.isAdmin
    })
  }
  render() {
    const { team } = this.props
    return (
      <Card className={styles.Card}>
        <CardHeader className={styles.CardHeader}>
          <h3>
            {this.state.editing ? (
              <React.Fragment>
                <Input
                  value={this.state.teamName}
                  onChange={this.handleChange}
                  name="teamName"
                  type="text"
                />
                <i className="fa fa-save" onClick={this.handleUpdateName} />
              </React.Fragment>
            ) : (
              this.state.teamName
            )}{' '}
            {this.state.isAdmin && (
              <i
                className={
                  this.state.editing ? 'fa fa-times-circle-o' : 'fa fa-pencil'
                }
                onClick={() => this.setState({ editing: !this.state.editing })}
              />
            )}
          </h3>invite code: {team.ZUID}
          <i
            className={`fa fa-trash ${styles.trash}`}
            onClick={this.handleDeleteTeam}
          />
        </CardHeader>
        <CardContent>
          <h1>Members</h1>
          {/* {Maybe do a with loader?} */}
          {team.members &&
            team.members.map(member => {
              return (
                <article className={styles.CardContent} key={member.ZUID}>
                  <p title={member.email}>
                    <i className="fa fa-user" />
                    {member.name}
                    {member.admin ? <i className="fa fa-star" /> : null}
                  </p>
                  <i
                    className={`${styles.remove} fa fa-times-circle-o`}
                    onClick={() => this.removeUser(member.ZUID)}
                  />
                </article>
              )
            })}
          <h1>Instances</h1>
          {team.instances &&
            team.instances.map(instance => {
              return (
                <article className={styles.Instance} key={instance.ZUID}>
                  <p>
                    <i className="fa fa-globe" />
                    {instance.name}
                  </p>
                  <p>role: {instance.role}</p>
                </article>
              )
            })}
        </CardContent>
        <CardFooter>
          <form onSubmit={this.handleInvite} className={styles.CardInvite}>
            <Input type="text" name="inviteeEmail" autoComplete="off" />
            <Button type="submit">
              <i className="fa fa-envelope-o" />
              Invite
            </Button>
          </form>
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
      .dispatch(updateTeam(this.props.team.ZUID, this.state.teamName))
      .then(() => {
        this.setState({ editing: false })
      })
  }
  handleInvite = evt => {
    evt.preventDefault()
    console.log('data:', this.props.team.ZUID, evt.target.inviteeEmail.value)
    this.props.dispatch(
      inviteMember(this.props.team.ZUID, evt.target.inviteeEmail.value)
    )
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
  removeUser = user => {
    // confirm, then remove team member
    console.log(user, this.props.team.ZUID)
  }
}

export default TeamCard
