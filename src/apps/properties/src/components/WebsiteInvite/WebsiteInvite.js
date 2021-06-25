import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import cx from 'classnames'

// NOTE: Fetch Sites seems unecessary. Should be able to fetch the individual site
import { fetchSites, acceptInvite, declineInvite } from '../../store/sites'
import { notify } from '../../../../../shell/store/notifications'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

import styles from './WebsiteInvite.less'
class WebsiteInvite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false
    }
  }

  render() {
    return (
      <Card className={styles.WebsiteInvite}>
        <CardHeader className={styles.CardHeader}>
          <h1 className={styles.subheadline}>{this.props.site.name}</h1>
        </CardHeader>

        {this.props.site.screenshotURL ? (
          <CardContent
            className={cx(styles.CardContent, styles.cover)}
            style={{ backgroundImage: `url(${this.props.site.screenshotURL})` }}
          />
        ) : (
          <CardContent className={cx(styles.CardContent)}>
            <Url
              className={styles.Preview}
              target="_blank"
              title={`Preview  ${this.props.site.name}`}
              href={`${CONFIG.PREVIEW_URL_PROTOCOL}${this.props.site.randomHashID}${CONFIG.PREVIEW_URL}`}>
              <i
                className={cx(styles.icon, 'fa fa-globe')}
                aria-hidden="true"
              />
            </Url>
          </CardContent>
        )}

        <CardFooter className={cx(styles.CardFooter, styles.Actions)}>
          <Button
            kind="save"
            className={styles.invite}
            onClick={this.handleAccept}
            disabled={this.state.submitted}>
            <i className="fas fa-check-circle" aria-hidden="true" />
            Accept Invite
          </Button>
          <Button
            kind="cancel"
            onClick={this.handleDecline}
            disabled={this.state.submitted}>
            <i className="fa fa-ban" aria-hidden="true" />
            Decline
          </Button>
        </CardFooter>
      </Card>
    )
  }
  handleAccept = evt => {
    this.setState({ submitted: true })
    // post accepted invite data THEN route to the overview when the user has permissions
    this.props
      .dispatch(acceptInvite(this.props.site.inviteZUID))
      .then(data => {
        this.props
          .dispatch(fetchSites())
          .then(data => {
            this.props.dispatch(
              notify({
                message: `You accepted your invite to ${this.props.site.name}`,
                type: 'success',
                timeout: 6000
              })
            )
            return this.props.history.push(
              `/instances/${this.props.site.ZUID}?invited=true`
            )
          })
          .catch(() => {
            this.props.dispatch(
              notify({
                message: 'There was a problem fetching your instances',
                type: 'error'
              })
            )
          })
      })
      .catch(() => {
        this.props.dispatch(
          notify({ message: 'Error occurred accepting invite', type: 'error' })
        )
      })
  }
  handleDecline = evt => {
    this.setState({ submitted: true })
    this.props
      .dispatch(declineInvite(this.props.site.inviteZUID))
      .then(data => {
        this.props.dispatch(
          notify({
            message: `You have declined your invite to ${this.props.site.name}`,
            type: 'info'
          })
        )
        this.props.dispatch(fetchSites()).catch(() => {
          this.props.dispatch(
            notify({
              message: 'There was a problem fetching your instances',
              type: 'error'
            })
          )
        })
      })
      .catch(() => {
        this.setState({ submitted: false })
        this.props.dispatch(
          notify({ message: 'Error declining invite', type: 'error' })
        )
      })
  }
}

export default withRouter(connect(state => state)(WebsiteInvite))
