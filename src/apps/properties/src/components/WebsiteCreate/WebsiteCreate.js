import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './WebsiteCreate.less'

import { Line } from 'react-chartjs-2'

class WebsiteCreate extends Component {
  render() {
    return (
      <article className={styles.WebsiteCreate}>
        <header>
          <h1 className={styles.name}>Your Web Property</h1>
        </header>
        <main className={styles.WebsiteManage}>
          <h1>Welcome to Zesty.io</h1>
          <p>
            Get started by creating your first Zesty website in a few easy
            steps.
          </p>

          {/* <Button className={styles.save}>

          </Button> */}
        </main>
        <footer>
          <Url href="/properties/create">
            <i className="fa fa-plus" aria-hidden="true" />&nbsp;Create Web
            Property
          </Url>
        </footer>
      </article>
    )
  }
}

export default connect(state => state)(WebsiteCreate)
