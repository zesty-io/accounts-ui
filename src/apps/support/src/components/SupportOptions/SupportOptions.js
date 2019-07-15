import React, { PureComponent } from 'react'
// import { connect } from 'react-redux'
// import { request } from '../../../../../util/request'
import styles from './support.less'

export default class SupportOptions extends PureComponent {
  render() {
    return (
      <section className={styles.Support}>
        <header>
          <h1 className={styles.SupportTitle}>Support</h1>
        </header>
        <main>
          <a href="mailto://support@zesty.io">
            <i className="fa fa-envelope-o fa-3x" />
            <span>Contact Support</span>
          </a>
          <a href="http://learn.zesty.io" target="_blank">
            <i className="fa fa-files-o fa-3x" />
            <span>Help Docs</span>
          </a>
          <a href="https://zesty.org/" target="_blank">
            <i className="fa fa-code fa-3x" />
            <span>Developer Docs</span>
          </a>

          <a href="http://chat.zesty.io" target="_blank">
            <i className="fa fa-slack fa-3x" />
            <span>Developer Chat</span>
          </a>
          {/* <a href="javascript:void(0)" onClick={this.reportBug}>
            <i className="fa fa-bug fa-3x" />
            <span>Bug Report</span>
          </a> */}
        </main>
      </section>
    )
  }
  reportBug = evt => {
    evt.preventDefault()
    return this.props.history.push(`support/bugreport`)
  }
}
