import React, { Component } from 'react'

import styles from './TeamCard.less'
class TeamCard extends Component {
  render() {
    const { team } = this.props
    return (
      <Card className={styles.Card}>
        <CardHeader>{team.name}</CardHeader>
        <CardContent>
          {team.members.map(member => {
            return (
              <article className={styles.CardContent}>
                <p key={member.ZUID}>{`${member.name}, ${member.email}`}</p>
              </article>
            )
          })}
        </CardContent>
        <CardFooter>
          <Button onClick={() => console.log('click', team.ZUID)} text="Edit Team" />
        </CardFooter>
      </Card>
    )
  }
}

export default TeamCard
