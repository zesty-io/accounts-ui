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
      <Card>
        <CardHeader>
          <h2>
            <i className="fa fa-info-circle" aria-hidden="true" />
            &nbsp;Instance Settings
          </h2>
        </CardHeader>
        <CardContent>
          <PropertyName
            siteZUID={this.props.site.ZUID}
            name={this.props.site.name}
            dispatch={this.props.dispatch}
          />
          <Domain siteZUID={this.props.site.ZUID} site={this.props.site} dispatch={this.props.dispatch} />
          <div className={styles.Meta}>
            <header>
              <h3>
                Zesty Unique ID(<small>ZUID</small>)
              </h3>
              <h3>Created</h3>
              <h3>Updated</h3>
              <h3>Hash ID</h3>
            </header>
            <main>
              <article>
                <span>{this.props.site.ZUID}</span>
                <span>{formatDate(this.props.site.createdAt)}</span>
                <span>{formatDate(this.props.site.updatedAt)}</span>
                <span>{this.props.site.randomHashID}</span>
              </article>
            </main>
          </div>
        </CardContent>
      </Card>
    )
  }
}
