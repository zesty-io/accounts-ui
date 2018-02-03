import React, { PureComponent } from 'react'
import {NavLink, Link} from 'react-router-dom'
import styles from './styles.less'
import MessageIcon from '../Messages/Icon'

export default class GlobalHeader extends PureComponent {
  render () {
    return (
      <header className={styles.GlobalHeader}>
        <img className={styles.logo} src='/zesty-z-logo.png' />
        <nav className={styles.GlobalNav}>
          <NavLink to='/dashboard'>Dashboard</NavLink>
          <NavLink to='/properties'>Web Properties</NavLink>
          <NavLink to='/settings'>My Settings</NavLink>
          <MessageIcon />
        </nav>
        <span className={styles.logout} title='Logout'>
          <span>{this.props.user.firstname} {this.props.user.lastname}</span>
          <Link to='/logout'>
            <i className='fa fa-sign-out' aria-hidden='true' />
          </Link>
        </span>
      </header>
    )
  }
}
