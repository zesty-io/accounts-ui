import React, { Component } from 'react'

import styles from './TeamCard.less'
class TeamCard extends Component {
  state = {
    teamName: '',
    editing: false
  }
  componentDidMount() {
    this.setState({
      teamName: this.props.team.name
    })
  }
  render() {
    const { team } = this.props
    return (
      <Card className={styles.Card}>
        <CardHeader>
          <h3>
            {this.state.editing ? (
              <Input
                value={this.state.teamName}
                onChange={this.handleChange}
                name="teamName"
                type="text"
              />
            ) : (
              this.state.teamName
            )}{' '}
            <i
              className="fa fa-pencil"
              onClick={() => this.setState({ editing: !this.state.editing })}
            />
          </h3>invite code: {team.hash}
        </CardHeader>
        <CardContent>
          <h1>Members</h1>
          {team.members.map(member => {
            return (
              <article className={styles.CardContent} key={member.ZUID}>
                <p title={member.email}>
                  <i className="fa fa-user" />
                  {member.name}
                </p>
                <i className={`${styles.remove} fa fa-times-circle-o`} onClick={() => this.removeUser(member.ZUID)}/>
                {/* {member.email} */}
              </article>
            )
          })}
          <h1>Instances</h1>
          {team.instances.map(instance => {
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
        <CardFooter className={styles.CardInvite}>
          <Input type="text" />
          <Button onClick={() => console.log('click', team.ZUID)}>
            <i className="fa fa-envelope-o" />
            Invite
          </Button>
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
    // send name to update endpoint
  }
  handleInvite = evt => {
    // 
  }
  removeUser = user => {
    // confirm, then remove team member
    console.log(user, this.props.team.ZUID)
  }
}

export default TeamCard
