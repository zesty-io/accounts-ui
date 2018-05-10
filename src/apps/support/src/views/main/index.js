import React, { Component } from 'react'
import { connect } from 'react-redux'

import { request } from '../../../../../util/request'
import config from '../../../../../shell/config'

import styles from './Support.less'

const sendBugReport = data => {
  console.log(JSON.stringify(data, null, 2))
  request(config.EMAIL_SERVICE, {
    method: 'POST',
    json: true,
    body: {
      senderHandle: 'bugs',
      senderName: data.name,
      emailSubject: `Bug report from Accounts-UI dateTime-${data.currentTime}`,
      emailBody: JSON.stringify(data, null, 2),
      toRecipient: 'support@zesty.io'
    }
  })
    .then(data => {
      // close the modal and display a thank you message
      this.props.dispatch({ type: 'REMOVE_MODAL' })
    })
    .catch(err => {
      console.log(err)
    })
}

const BugReport = userData => {
  return (
    <div className={styles.bugReport}>
      <h2> Bug Report</h2>
      <form
        onSubmit={evt => {
          evt.preventDefault()
          // generate user data object to be send with the bug report
          const dataObj = { ...userData.props, currentTime: Date.now() }
          Object.keys(evt.target).map(key => {
            if (evt.target[key]['name']) {
              if (evt.target[key].type === 'checkbox') {
                return (dataObj[evt.target[key]['name']] =
                  evt.target[key].checked)
              }
              dataObj[evt.target[key]['name']] = evt.target[key]['value']
            }
          })
          sendBugReport(dataObj)
        }}>
        <p>
          We appologize that you have experienced issues with our product.<br />
          In order to make this product better for you please give as much
          detail as possible.
        </p>
        <label>Describe the issue</label>
        <textarea name="reportedIssue" wrap="soft" />
        <span className={styles.inline}>
          <input type="checkbox" name="followUp" />
          <p>Please follow up with me about this issue.</p>
        </span>
        <Button type="submit" text="Submit" />
      </form>
    </div>
  )
}

class Support extends Component {
  state = {
    userInfo: {}
  }

  componentDidMount(props) {
    let navClone = {}
    // have to use a for in loop because navigator is magic
    for (const prop in navigator) {
      navClone[prop] = navigator[prop]
    }
    //remove functions from the object proto
    Object.keys(navClone).map(key => {
      if (typeof navClone[key] !== 'string') {
        delete navClone[key]
      }
    })
    this.setState({
      userInfo: { navData: navClone, zestyUser: this.props.user }
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

export default connect(state => {
  return { user: state.user }
})(Support)
