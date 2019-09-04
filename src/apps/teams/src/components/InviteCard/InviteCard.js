import React, { PureComponent } from 'react'
import { acceptTeamInvite, declineTeamInvite } from '../../store/teamInvites'

import { notify } from '../../../../../shell/store/notifications'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { WithLoader } from '@zesty-io/core/WithLoader'
import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Button } from '@zesty-io/core/Button'

import styles from './InviteCard.less'
export default class InviteCard extends PureComponent {
  render() {
    return (
      <Card className={styles.TeamInvite}>
        <CardHeader>
          <h3>You Have Been Invited to a Team!</h3>
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <WithLoader condition={this.props.invite.name}>
            <h3 className={styles.headline}>{this.props.invite.name}</h3>
            <p>{this.props.invite.description}</p>
          </WithLoader>
        </CardContent>
        <CardFooter className={styles.CardFooter}>
          <ButtonGroup className={styles.actions}>
            <Button onClick={this.handleAccept} kind="secondary">
              <i className="fas fa-check" />
              Accept Invite
            </Button>
            <Button onClick={this.handleDecline}>
              <i className="fas fa-ban" />
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
