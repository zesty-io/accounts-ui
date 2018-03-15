import React, { Component } from 'react'
import {connect} from 'react-redux'
import {updateSetting, addEmail} from '../../store'
import styles from './email.less'

class Email extends Component {
  handleChange = (e) => {
    this.props.dispatch(updateSetting( { [e.target.name]: e.target.value}))
  }
  handleClick = (e) => {
    this.props.dispatch(addEmail())
  }
  render () {
    return (
      <section className={styles.profileEmail}>
        <h2>Emails</h2>
        <div>
        <div className="info">
          <p><strong>Tip: Why set up multiple emails?</strong></p>
          <p>Setting up multiple emails lets you accept all of your account invitations in one place.</p>
        </div>
        <table className="basicList">
          <tbody><tr>
            <th>Email</th>
            <th>Options</th>
          </tr>
            {this.props.emails.map((email, i) => <tr key={i}><td>{email.email} </td><td>{email.options}</td></tr>)}
          <tr>
            <td className="form">
              <Input type="text" placeholder="Email" name='newEmail' value={this.props.newEmail} onChange={this.handleChange}/>
            </td>
            <td>
              <Button text="Add Email" onClick={this.handleClick}/>
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
