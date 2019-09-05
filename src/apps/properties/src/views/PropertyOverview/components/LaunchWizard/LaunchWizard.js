import React, { Component } from 'react'
import styles from './LaunchWizard.less'

import { checkDNS } from '../../../../store/sites'

import Domain from '../Domain'
import { notify } from '../../../../../../../shell/store/notifications'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

export default class LaunchWizard extends Component {
  state = {
    isVerified: false,
    submitted: false
  }
  render() {
    return (
      <Card className={styles.LaunchWizard}>
        <CardHeader className={styles.CardHeader}>
          <h2>
            <i className="fa fa-rocket" aria-hidden="true" />
            &nbsp;Publish Your Instance!
          </h2>
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <ol>
            <li>
              <h4>Set your domain</h4>
              {this.props.isAdmin ? (
                <Domain
                  siteZUID={this.props.site.ZUID}
                  site={this.props.site}
                  domain={this.props.site.domain}
                  dispatch={this.props.dispatch}
                />
              ) : (
                <p className={styles.domain}>
                  <em>
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    />
                    &nbsp; You must be a instance owner or admin to set the
                    domain
                  </em>
                </p>
              )}
            </li>

            <li className={styles.dns}>
              Configure your <abbr title="Domain Name Servers">DNS</abbr>{' '}
              provider
              <div className={styles.settings}>
                <p>
                  Add these A records for your apex domain. Multiple records
                  allow for DNS lookup redundancy.
                </p>
                <p className={styles.aRecords}>
                  {CONFIG.A_RECORDS.map(rec => (
                    <code>{rec}</code>
                  ))}
                </p>

                <div className={styles.cname}>
                  <p>Add this CNAME record for your www sub-domain.</p>
                  <p>
                    <code>{CONFIG.C_NAME}</code>
                  </p>
                </div>

                <p>
                  <Url
                    target="_blank"
                    href="https://zesty.org/services/web-engine/guides/how-to-launch-an-instance#3-configure-you-domains-dns-settings">
                    Learn more about DNS in our documentation.
                  </Url>
                </p>
              </div>
            </li>
            <li className={styles.confirm}>
              Confirm your instance is live
              <Button
                kind="save"
                onClick={this.handleCheckDNS}
                disabled={this.state.submitted}>
                {this.state.isVerified ? (
                  <i className="fa fa-check" aria-hidden="true" />
                ) : (
                  <i className="fa fa-question" aria-hidden="true" />
                )}
                Check DNS
              </Button>
            </li>
          </ol>
        </CardContent>
      </Card>
    )
  }
  handleCheckDNS = () => {
    if (!this.props.site.domain) {
      this.props.dispatch(
        notify({
          type: 'error',
          message: 'A domain must be set in order to verify DNS'
        })
      )
      return
    }

    this.setState({ submitted: true })
    this.props
      .dispatch(
        checkDNS({
          aRecord: CONFIG.A_RECORD,
          cName: CONFIG.C_NAME,
          domain: this.props.site.domain
        })
      )
      .then(data => {
        if (data.verified) {
          this.props.dispatch(
            notify({
              type: 'success',
              message: 'Your DNS successfully verified'
            })
          )
          this.setState({ isVerified: true, submitted: false })
        } else {
          this.props.dispatch(
            notify({
              type: 'error',
              message: 'Your DNS could not be verified'
            })
          )
          this.setState({ isVerified: false, submitted: false })
        }
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            type: 'error',
            message: 'Your DNS could not be verified'
          })
        )
        this.setState({ isVerified: false, submitted: false })
      })
  }
}
