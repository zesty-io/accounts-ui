import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Support.less'

const BugReport = userData => {
  return (
    <div className={styles.bugReport}>
      <form
        onSubmit={evt => {
          evt.preventDefault()
          const form = { ...userData.props, currentTime: Date.now() }
          Object.keys(evt.target).map(key => {
            if (evt.target[key]['name']) {
              form[evt.target[key]['name']] = evt.target[key]['value']
            }
          })
          console.log(form)
        }}>
        <label>Name</label>
        <Input required type="text" name="name" />
        <label>Describe the issue</label>
        <textarea name="issue" wrap="soft" />
        <label>Where in the app did this happen</label>
        <textarea name="where" wrap="soft" />
        <label>Additional context</label>
        <textarea name="context" wrap="soft" />
        <label>Contact Email</label>
        <Input type="email" name="email" />
        <Input type="submit" />
      </form>
    </div>
  )
}

class Support extends Component {
  state = {
    userInfo: {}
  }

  componentDidMount() {
    let navClone = {}
    // have to use a for in loop because navigator is magic
    for (const prop in navigator) {
      navClone[prop] = navigator[prop]
    }
    //remove functions from the object proto
    Object.keys(navClone).map(key => {
      if(typeof navClone[key] === "function") {
        delete navClone[key]
      }
    })
    this.setState({
      userInfo: { ...navClone }
    })
  }
  launchBugReport = () => {
    this.props.dispatch({
      type: 'NEW_MODAL',
      component: BugReport,
      props: this.state
    })
  }
  render() {
    return (
      <div className={styles.Support}>
        <h2>Support</h2>

        <section>
          <article>
            <a href="#!/support/contact/">
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
            <a href="#" onClick={this.launchBugReport}>
              <i className="fa fa-bug fa-3x" />
              <p> Bug Report </p>
            </a>
          </article>
        </section>
      </div>
    )
  }
}

export default connect(state => state)(Support)
