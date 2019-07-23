import React, { PureComponent } from 'react'
import { acceptTeamInvite, declineTeamInvite } from '../../store/teamInvites'

import styles from './InviteCard.less'
import { notify } from '../../../../../shell/store/notifications'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { Button } from '@zesty-io/core/Button'

export default class InviteCard extends PureComponent {
  render() {
    return (
      <Card className={styles.TeamInvite}>
        <CardHeader>
          <h3>You Have Been Invited to a Team!</h3>
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <h3>{this.props.invite.name}</h3>
          <p>{this.props.invite.description}</p>
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
    this.props
      .dispatch(
        acceptTeamInvite(
          this.props.invite.inviteZUID,
          this.props.invite.teamZUID
        )
      )
      .then(() => {
        this.props.dispatch(
          notify({ message: 'Invite accepted', type: 'success' })
        )
      })
      .catch(() => {
        this.props.dispatch(
          notify({ message: 'Error accepting invite', type: 'error' })
        )
      })
  }
  handleDecline = () => {
    this.props
      .dispatch(
        declineTeamInvite(
          this.props.invite.inviteZUID,
          this.props.invite.teamZUID
        )
      )
      .then(() => {
        this.props.dispatch(
          notify({ message: 'Invite declined', type: 'success' })
        )
      })
      .catch(() => {
        this.props.dispatch(
          notify({ message: 'Error declining invite', type: 'error' })
        )
      })
  }
}
