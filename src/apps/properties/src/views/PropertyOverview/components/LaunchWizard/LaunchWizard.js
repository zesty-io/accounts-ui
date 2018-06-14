import { Component } from 'react'
import styles from './LaunchWizard.less'

import { checkDNS } from '../../../../store/sites'

import Domain from '../Domain'
import { notify } from '../../../../../../../shell/store/notifications'

export default class LaunchWizard extends Component {
  state = {
    aRecord: '',
    cName: '',
    isVerified: false,
    submitted: false
  }
  render() {
    return (
      <Card className={styles.LaunchWizard}>
        <CardHeader className={styles.CardHeader}>
          <h2>
            <i className="fa fa-rocket" aria-hidden="true" />
            &nbsp;Send Your Instance Live!
          </h2>
        </CardHeader>
        <CardContent>
          <p className={styles.instructions}>
            By sending your instance live it will have a domain which allows
            public internet access. This can be done in 2 steps. View our{' '}
            <Url
              href="https://developer.zesty.io/docs/satellite-sites/launching-a-satellite-site/"
              target="_blank">
              documentation
            </Url>{' '}
            for more detail.
          </p>
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
                    />&nbsp; You must be a instance owner or admin to set the
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
                  CNAME:{' '}
                  <Input
                    name="cName"
                    onChange={this.handleChange}
                    value={this.state.cName}
                  />
                </p>
                <p>
                  A Record:{' '}
                  <Input
                    name="aRecord"
                    onChange={this.handleChange}
                    value={this.state.aRecord}
                  />
                </p>
              </div>
            </li>
            <li className={styles.confirm}>
              Confirm your instance is live
              <Button
                type="save"
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
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleCheckDNS = () => {
    this.setState({ submitted: true })
    this.props
      .dispatch(
        checkDNS({
          aRecord: this.state.aRecord,
          cName: this.state.cName,
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
  }
}
