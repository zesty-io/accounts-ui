import {PureComponent} from 'react'
import {NavLink} from 'react-router-dom'
import {MessageIcon} from '../Messages/Icon'
import styles from './styles.less'

import {logout} from '../../store/auth'

export class GlobalHeader extends PureComponent {
  render () {
    return (
      <header className={styles.GlobalHeader}>
        <img className={styles.logo} src='/zesty-z-logo.png' />
        <nav className={styles.GlobalNav}>
          {/*<NavLink to='/dashboard'>Dashboard</NavLink>*/}
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
