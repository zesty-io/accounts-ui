import React, { PureComponent } from 'react'
import {NavLink, Link} from 'react-router-dom'
import styles from './styles.less'
import MessageIcon from '../Messages/Icon'

export default class GlobalHeader extends PureComponent {
  render() {
    return (
      <header className={styles.GlobalHeader}>
        <img className={styles.logo} src="/zesty-z-logo.png" />
        <nav className={styles.GlobalNav}>
          <NavLink activeClassName="selected" to="/dashboard">Dashboard</NavLink>
          <NavLink activeClassName="selected" to="/sites">Web Properties</NavLink>
          <NavLink activeClassName="selected" to="/settings">My Settings</NavLink>
          <MessageIcon />
        </nav>
        <span className={styles.logout} title="Logout">
          <Link to="/logout">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </Link>
        </span>
      </header>
    )
  }
}
