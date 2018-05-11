import react, { Component } from 'react'
import { connect } from 'react-redux'

import { request } from '../../../../../util/request'
import config from '../../../../../shell/config'

import styles from './BugReport.less'
class BugReport extends Component {
  componentDidMount() {
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
      userInfo: {
        navData: navClone,
        zestyUser: this.props.user
      }
    })
  }

  render() {
    const { userData } = this.props.user
    return (
      <div className={styles.bugReport}>
        <h2> Bug Report</h2>
        <form
          onSubmit={evt => {
            evt.preventDefault()
            // generate user data object to be send with the bug report
            const dataObj = {
              ...userData,
              currentTime: Date.now()
            }

            const formData = new FormData(evt.target)
            console.log(formData)
            formData.forEach((entry, key) => {
              if (evt.target[key].type === 'checkbox') {
                dataObj[key] = evt.target[key].checked
              } else {
                dataObj[key] = entry
              }
            })

            this.sendBugReport(dataObj)
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
          <Button type="cancel" text="Cancel" onClick={this.cancel} />
        </form>
      </div>
    )
  }

  cancel = evt => {
    evt.preventDefault()
    this.props.history.push('/support')
  }

  sendBugReport = data => {
    console.log(JSON.stringify(data, null, 2))
    request(config.EMAIL_SERVICE, {
      method: 'POST',
      json: true,
      body: {
        senderHandle: 'bugs',
        senderName: data.name,
        emailSubject: `Bug report from Accounts-UI dateTime-${
          data.currentTime
        }`,
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
}

export default connect(state => state)(BugReport)
