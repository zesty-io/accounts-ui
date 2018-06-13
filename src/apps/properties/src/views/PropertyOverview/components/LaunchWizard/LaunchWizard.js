import { Component } from 'react'
import styles from './LaunchWizard.less'

import Domain from '../Domain'

export default class LaunchWizard extends Component {
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
              target="_blank"
            >
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
                  CNAME: <code>sites2.zesty.zone</code>
                </p>
                <p>
                  A Record: <code>130.211.21.25</code>
                </p>
              </div>
            </li>
            {/* <li className={styles.confirm}>
              Confirm your instance is live
              <Button type="save">
                <i className="fa fa-check" aria-hidden="true" />
                Check DNS
              </Button>
            </li> */}
          </ol>
        </CardContent>
      </Card>
    )
  }
}
