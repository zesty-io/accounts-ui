import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader } from '@zesty-io/core/Card'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

// NOTE: Fetch Sites seems unecessary. Should be able to fetch the individual site
import { fetchSites, acceptInvite, declineInvite } from '../../store/sites'
import { notify } from '../../../../../shell/store/notifications'

import cx from 'classnames'
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
          <h1 className={styles.Name}>{this.props.site.name}</h1>
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
              href={`https://${this.props.site.randomHashID}.preview.zesty.io`}>
              <i
                className={cx(styles.icon, 'fa fa-globe')}
                aria-hidden="true"
              />
            </Url>
          </CardContent>
        )}

        <CardFooter className={cx(styles.CardFooter, styles.Actions)}>
          <Button
            type="save"
            className={styles.invite}
            onClick={this.handleAccept}
            disabled={this.state.submitted}>
            <i className="fa fa-check-circle-o" aria-hidden="true" />
            Accept Invite
          </Button>
          <Button
            type="cancel"
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
    this.props.dispatch(acceptInvite(this.props.site.inviteZUID)).then(data => {
      this.props.dispatch(fetchSites()).then(data => {
        const invitedSite = data.data.filter(site => {
          return site.ZUID === this.props.site.ZUID
        })
        return this.props.history.push(
          `/instances/${this.props.site.ZUID}?invited=true`
        )
      })
      this.props.dispatch(
        notify({
          message: `You accepted your invite to ${this.props.site.name}`,
          type: 'success',
          timeout: 6000
        })
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
        this.props.dispatch(fetchSites())
      })
  }
}

export default withRouter(connect(state => state)(WebsiteInvite))
