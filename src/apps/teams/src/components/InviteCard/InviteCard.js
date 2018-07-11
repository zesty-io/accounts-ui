import React, { PureComponent } from 'react'
import { acceptTeamInvite, declineTeamInvite } from '../../store/teamInvites'

import styles from './InviteCard.less'

export default class InviteCard extends PureComponent {
  render() {
    const { team } = this.props
    return (
      <Card className={styles.TeamInvite}>
        <CardHeader>
          <h3>Invited to Team: {team.name}</h3>
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <h3>Team description</h3>
          <p>{team.description}</p>
          <p>Accept or decline this invite below</p>
        </CardContent>
        <CardFooter className={styles.CardFooter}>
          <ButtonGroup>
            <Button onClick={this.handleAccept}>
              <i className="fa fa-check" />
              Accept Invite
            </Button>
            <Button onClick={this.handleDecline} type="cancel">
              <i className="fa fa-close" />
              Decline
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    )
  }
  handleAccept = () => {
    console.log(this.props)
    this.props.dispatch(acceptTeamInvite(this.props.team.ZUID))
    // .then(() => {
    //   this.props.dispatch(fetchTeam(this.props.team.ZUID))
    // })
  }
  handleDecline = () => {
    this.props.dispatch(declineTeamInvite(this.props.team.ZUID))
  }
}
