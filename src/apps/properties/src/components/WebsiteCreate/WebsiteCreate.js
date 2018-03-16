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
          <p>Create your first Zesty website in 3 easy steps.</p>
          <Button className={styles.save}>
            <Link to="/properties/create">
              <i className="fa fa-plus" aria-hidden="true" /> Create Web
              Property
            </Link>
          </Button>
        </main>
      </article>
    )
  }
}

export default connect(state => state)(WebsiteCreate)
