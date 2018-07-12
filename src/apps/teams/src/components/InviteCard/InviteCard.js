import React, { PureComponent } from 'react'
import { acceptTeamInvite, declineTeamInvite } from '../../store/teamInvites'

import styles from './InviteCard.less'

export default class InviteCard extends PureComponent {
  render() {
    return (
      <Card className={styles.TeamInvite}>
        <CardHeader>
          <h3>Invited to Team: {this.props.invite.name}</h3>
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <h3>Team description</h3>
          <p>{this.props.invite.description}</p>
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
    this.props.dispatch(
      acceptTeamInvite(this.props.invite.ZUID, this.props.invite.teamZUID)
    )
  }
  handleDecline = () => {
    this.props.dispatch(declineTeamInvite(this.props.invite.ZUID))
  }
}
