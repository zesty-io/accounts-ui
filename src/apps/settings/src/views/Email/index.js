import React, { Component } from 'react'
import {connect} from 'react-redux'

import {addEmail} from '../../store'

import './email.less'

class Email extends Component {
  constructor(props) {
    super()
  }
  
  render () {
    return (
      <section id='settings'>
        <h1>Emails</h1>
        <div className="info">
          <strong>Tip: Why set up multiple emails?</strong>
          <p>Setting up multiple emails lets you accept all of your account invitations in one place.</p>
        </div>
        <table className="basicList">
          <tbody><tr>
            <th>Email</th>
            <th>Options</th>
          </tr>
            {
              this.state ?
              this.state.map((email, i) => <tr key={i}><td>{email.email} </td><td>{i === 0 ? <em>(login email)</em> : email.options}</td></tr>)
              :
              <tr><td>loading</td></tr>
            }
          <tr>
            <td className="form">
              <Input type="text" placeholder="Email" id="new-email" />
            </td>
            <td>
              <Button text="Add Email" />
            </td>
          </tr>
        </tbody></table>
      </section>
    )
  }
}

export default connect(state => state)(Email)
