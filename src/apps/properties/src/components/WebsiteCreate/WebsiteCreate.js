import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { Button } from '@zesty-io/core/Button'

import styles from './WebsiteCreate.less'

export default class WebsiteCreate extends PureComponent {
  render() {
    return (
      <article className={styles.WebsiteCreate}>
        <header>
          <h1 className={styles.name}>
            {this.props.first
              ? 'Welcome to Zesty.io'
              : 'Create Zesty.io Instance'}
          </h1>
        </header>
        <main className={styles.WebsiteManage}>
          {this.props.first ? (
            <p>
              Get started by creating your first Zesty web instance in a few
              easy steps.
            </p>
          ) : null}
          <p>
            <em>
              Instances are a way for you to categorize content by a domain.
              This could either be a website or an API to serve managed content.
            </em>
          </p>
        </main>
        <footer>
          <Link to="/instances/create" className={styles.Button}>
            <Button type="save">
              <i className="fa fa-plus" aria-hidden="true" />
              {this.props.first
                ? 'Create Your First Instance'
                : 'Create New Instance'}
            </Button>
          </Link>
        </footer>
      </article>
    )
  }
}
