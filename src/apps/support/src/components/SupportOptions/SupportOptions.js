import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { request } from '../../../../../util/request'


import styles from './support.less'

class SupportOptions extends Component {
  state = {
    userInfo: {}
  }

  render() {
    return (
      <div className={styles.Support}>
        <h1 className={styles.SupportTitle}>Support</h1>

        <section>
          <article>
            <a href="mailto://support@zesty.io">
              {
                //TODO: where should this link go?
              }
              <i className="fa fa-envelope-o fa-3x" />
              <p> Contact Support </p>
            </a>
          </article>

          <article>
            <a href="http://learn.zesty.io" target="_blank">
              <i className="fa fa-files-o fa-3x" />
              <p> Help Docs </p>
            </a>
          </article>

          <article>
            <a href="https://forum.zesty.io/" target="_blank">
              <i className="fa fa-comments-o fa-3x" />
              <p> Forums </p>
            </a>
          </article>
        </section>
        <h2>Developer Community Resources</h2>

        <section>
          <article>
            <a href="https://developer.zesty.io/" target="_blank">
              <i className="fa fa-code fa-3x" />
              <p> Developer Docs </p>
            </a>
          </article>

          <article>
            <a href="http://chat.zesty.io" target="_blank">
              <i className="fa fa-slack fa-3x" />
              <p> Developer Chat </p>
            </a>
          </article>
        </section>
        <h2>Report A Bug</h2>

        <section>
          <article>
            <a href="" onClick={this.reportBug}>
              <i className="fa fa-bug fa-3x" />
              <p> Bug Report </p>
            </a>
          </article>
        </section>
      </div>
    )
  }

  reportBug = (evt) => {
    evt.preventDefault()
    return this.props.history.push(`support/bugreport`)
  }
}

export default withRouter(connect(state => state)(SupportOptions))
