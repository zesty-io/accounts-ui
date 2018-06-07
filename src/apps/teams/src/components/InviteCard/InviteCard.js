import React, { Component } from 'react'

import styles from './invite.less'

class InviteCard extends Component {
  state = {
    clicked: false
  }
  render() {
    const { team } = this.props
    console.log(team)
    return (
      <Card className={styles.Card}>
        <CardHeader>
          <h3>Invited to Team: {team.name}</h3>
          <p>you can accept or decline this invite below</p>
        </CardHeader>
        <CardContent>
          <h1>Members</h1>
          {team.members.map(member => {
            return (
              <article className={styles.CardContent} key={member.ZUID}>
                <p title={member.email}>
                  <i className="fa fa-user" />
                  {member.name}
                  {member.admin ? <i className="fa fa-star" /> : null}
                </p>
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
          <Button onClick={() => console.log('click')}>
            <i className="fa fa-check" />
            Accept Invite
          </Button>
          <Button onClick={() => console.log('click')} type="cancel">
            <i className="fa fa-close" />
            Decline Invite
          </Button>
        </CardFooter>
      </Card>
    )
  }
}

export default InviteCard
