import React, { Component } from 'react'
import { handleTeamInvite, fetchTeam } from '../../store'

import styles from './invite.less'

class InviteCard extends Component {
  state = {
    clicked: false
  }
  render() {
    const { team } = this.props
    return (
      <Card className={styles.Card}>
        <CardHeader>
          <h2>Invited to Team: {team.name}</h2>
          <p>you can accept or decline this invite below</p>
        </CardHeader>
        <CardContent>
          <h2>Team description</h2>
          <p>{team.description}</p>
        </CardContent>
        <CardFooter className={styles.CardInvite}>
          <Button onClick={this.handleAccept}>
            <i className="fa fa-check" />
            Accept Invite
          </Button>
          <Button onClick={this.handleDecline} type="cancel">
            <i className="fa fa-close" />
            Decline Invite
          </Button>
        </CardFooter>
      </Card>
    )
  }
  handleAccept = () => {
    this.props
      .dispatch(
        handleTeamInvite(
          this.props.team.teamInviteZUID,
          this.props.team.ZUID,
          'accept'
        )
      )
      .then(() => {
        this.props.dispatch(fetchTeam(this.props.team.ZUID))
      })
  }
  handleDecline = () => {
    this.props
      .dispatch(
        handleTeamInvite(
          this.props.team.teamInviteZUID,
          this.props.team.ZUID,
          'decline'
        )
      )
      .then(console.log)
  }
}

export default InviteCard
