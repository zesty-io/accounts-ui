import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@zesty-io/core/Button'

import styles from './WebsiteCreate.less'
export default class WebsiteCreate extends PureComponent {
  render() {
    return (
      <article className={styles.WebsiteCreate}>
        <header>
          <h1 className={styles.headline}>Creating an Instance</h1>
        </header>
        <main className={styles.WebsiteManage}>
          <p>
            Instances are a way for you to distribute content with a domain.
            Such as a website or an API to serve user managed content.
          </p>
          <p>
            Get started by creating your first instance in a few easy steps.
          </p>
        </main>
        <footer>
          <Link to="/instances/create">
            <Button kind="save">
              <i className="fa fa-plus" aria-hidden="true" />
              Create Your First Instance
            </Button>
          </Link>
        </footer>
      </article>
    )
  }
}
