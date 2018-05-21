import { Component } from 'react'

import styles from './Meta.less'

export default class Meta extends Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <h2>
            <i className="fa fa-info-circle" aria-hidden="true" />
            &nbsp;Site Metadata
          </h2>
        </CardHeader>
        <CardContent>
          <div className={styles.Roles}>
            {/* <Divider /> */}
            <div className={styles.currentRoles}>
              <header>
                <h3>Zuid</h3>
              </header>
              <main>
                <h3>{this.props.siteZUID}</h3>
              </main>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
}
