import React, { Component } from 'react'
import {connect} from 'react-redux'
import styles from './styles.less'

class Website extends Component {
  render() {
    return (
      <article className={styles.website}>
        <header>
          <h1><i className="fa fa-globe" aria-hidden="true"></i>{this.props.site.name}</h1>
        </header>
        <main>
          your website

          <Link>
            <i className="fa fa-external-link" aria-hidden="true"></i>View Stage
          </Link>
          <Link>
            <i className="fa fa-external-link" aria-hidden="true"></i>View Production
          </Link>

        </main>
        <footer></footer>
      </article>
    )
  }
}

const WebsiteView = connect(state => state)(Website)

export default WebsiteView
