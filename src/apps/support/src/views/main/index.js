import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Support.less'

class Support extends Component {
  render() {
    return (
      <div className={styles.Support}>
        <h2>Support</h2>

        <section>
          <article>
            <a href="#!/support/contact/">
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
      </div>
    )
  }
}

export default connect(state => state)(Support)
