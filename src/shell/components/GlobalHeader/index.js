import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import styles from './styles.less'
import MessageIcon from '../Messages/Icon'

import {logout} from '../../store/auth'

class GlobalHeader extends PureComponent {
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

          <i className='fa fa-sign-out' aria-hidden='true' onClick={() => this.props.dispatch(logout())} />
        </span>
      </header>
    )
  }
}
export default connect(state => state)(GlobalHeader)
