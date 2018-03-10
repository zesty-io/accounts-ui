import React, { Component } from 'react'
import {connect} from 'react-redux'

import {addEmail} from '../../store'

import './email.less'

class Email extends Component {
  constructor(props) {
    super()
    this.state= {
      newEmail: ''
    }
  }
  handleEmailChange(e){
    e.preventDefault()
    this.props.dispatch(addEmail(this.state.newEmail))
    this.setState({newEmail: ''})
  }
  render () {
    return (
      <section id='settings'>
        <h1>Emails</h1>
        <div>
        <div className="info">
          <strong>Tip: Why set up multiple emails?</strong>
          <p>Setting up multiple emails lets you accept all of your account invitations in one place.</p>
        </div>
        <table className="basicList">
          <tbody><tr>
            <th>Email</th>
            <th>Options</th>
          </tr>
            {this.props.emails.map((email, i) => <tr key={i}><td>{email.email} </td><td>{i === 0 ? <em>(login email)</em> : email.options}</td></tr>)}
          <tr>
            <td className="form">
              <Input type="text" placeholder="Email" name='email' id="new-email" value={this.state.newEmail} onChange={e => this.setState({newEmail: e.target.value})} />
            </td>
            <td>
              <Button text="Add Email" onClick={(e) => this.handleEmailChange(e)}/>
            </td>
          </tr>
        </tbody></table></div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return { emails: state.profile.emails }
}

export default connect(mapStateToProps)(Email)
