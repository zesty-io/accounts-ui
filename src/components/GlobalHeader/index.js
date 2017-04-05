import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
import styles from './styles.less'
import MessageIcon from '../Messages/Icon'

export default class GlobalHeader extends PureComponent {
  render() {
    return (
      <header className={styles.GlobalHeader}>
        <img className={styles.logo} src="/zesty-z-logo.png" />
        <nav className={styles.GlobalNav}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/sites">Web Properties</Link>
          <Link to="/account">My Account</Link>
          <MessageIcon />
        </nav>
        <span className={styles.logout} title="Logout">
          <i className="fa fa-sign-out" aria-hidden="true"></i>
        </span>
      </header>
    )
  }
}
