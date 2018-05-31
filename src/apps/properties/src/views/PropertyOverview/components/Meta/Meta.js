import { Component } from 'react'
import PropertyName from '../PropertyName'
import Domain from '../Domain'

import styles from './Meta.less'

const formatDate = date => {
  if (!date) {
    return ''
  }
  const newDate = new Date(date)
  return `${newDate.getMonth() +
    1}-${newDate.getDate()}-${newDate.getFullYear()}`
}

export default class Meta extends Component {
  render() {
    return (
      <Card className={styles.Meta}>
        <CardHeader className={styles.CardHeader}>
          <h2>
            <i className="fa fa-info-circle" aria-hidden="true" />&nbsp;
            <PropertyName
              siteZUID={this.props.site.ZUID}
              name={this.props.site.name}
              dispatch={this.props.dispatch}
            />
          </h2>
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <p className={styles.domain}>
            <span className={styles.title}>Domain:</span>
            <Domain
              siteZUID={this.props.site.ZUID}
              site={this.props.site}
              dispatch={this.props.dispatch}
            />
          </p>

          <article>
            <p className={styles.setting}>
              <span className={styles.title}>Created On:</span>{' '}
              {formatDate(this.props.site.createdAt)}
            </p>
            <p className={styles.setting}>
              <span className={styles.title}>Updated On:</span>{' '}
              {formatDate(this.props.site.updatedAt)}
            </p>
            <p className={styles.setting}>
              <span className={styles.title}>Instance ZUID:</span>{' '}
              {this.props.site.ZUID}
            </p>
            <p className={styles.setting}>
              <span className={styles.title}>
                Numeric ID <small>(Legacy)</small>:
              </span>
              {this.props.site.ID}
            </p>
            <p className={styles.setting}>
              <span className={styles.title}>
                Hash ID <small>(Legacy)</small>:
              </span>
              {this.props.site.randomHashID}
            </p>
          </article>

          {/* <div className={styles.Meta}>
            <header>
              <h3>Created</h3>
              <h3>Updated</h3>
              <h3>Instance ID</h3>
              <h3>Numeric ID (Legacy)</h3>
              <h3>Hash ID (Legacy)</h3>
            </header>
            <main>
              <article>
                <span>{formatDate(this.props.site.createdAt)}</span>
                <span>{formatDate(this.props.site.updatedAt)}</span>
                <span>{this.props.site.ZUID}</span>
                <span>{this.props.site.ID}</span>
                <span>{this.props.site.randomHashID}</span>
              </article>
            </main>
          </div> */}
        </CardContent>
      </Card>
    )
  }
}
