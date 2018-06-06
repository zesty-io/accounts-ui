import React, { Component } from 'react'

import styles from './TeamCard.less'
class TeamCard extends Component {
  render() {
    const { team } = this.props
    return (
      <Card className={styles.Card}>
        <CardHeader><h3>{team.name}</h3>invite code: {team.hash}</CardHeader>
        <CardContent>
          <h1>Members</h1>
          {team.members.map(member => {
            return (
              <article className={styles.CardContent}>
                <p key={member.ZUID}>
                  <i className="fa fa-user" />
                  {member.name}
                </p>
                {member.email}
                <i className="fa fa-times-circle" />
              </article>
            )
          })}
          <h1>Instances</h1>
          {team.instances.map(instance => {
            return (
              <article className={styles.CardContent}>
                <p key={instance.ZUID}>
                  <i className="fa fa-globe" />
                  {instance.name}
                </p>
                {instance.role}
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
}

export default TeamCard
