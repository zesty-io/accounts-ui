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
          <ul>
          {team.members.map(member => {
            return (
              <li className={styles.CardContent}>
                <p key={member.ZUID}>
                  <i className="fa fa-user" />
                  {member.name}
                </p>
                <i className={`${styles.remove} fa fa-times-circle`} />
                {/* {member.email} */}
              </li>
            )
          })}</ul>
          <h1>Instances</h1>
          {team.instances.map(instance => {
            return (
              <article className={styles.Instance}>
                <p key={instance.ZUID}>
                  <i className="fa fa-globe" />
                  {instance.name}
                </p>
                role: {instance.role}
              </article>
            )
          })}
        </CardContent>
        <CardFooter>
          <Input type="text" />
          <Button
            onClick={() => console.log('click', team.ZUID)}
            text="Invite"
          />
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
    //send state to update endpoint
  }
  handleInvite = evt => {
    //
  }
}

export default TeamCard
