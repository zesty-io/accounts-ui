import { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { MessageIcon } from '../Messages/Icon'
import styles from './AppHeader.less'

import { logout } from '../../store/auth'

export default class AppHeader extends PureComponent {
  render() {
    return (
      <header className={styles.AppHeader}>
        <img className={styles.logo} src="/zesty-z-logo.svg" />
        <nav className={styles.GlobalNav}>
          {/* <NavLink to="/dashboard">Dashboard</NavLink> */}
          <NavLink to="/properties">Web Properties</NavLink>
          <NavLink to="/settings/account">My Account</NavLink>
          {/* <NavLink to="/messages">
            <MessageIcon />
          </NavLink> */}
        </nav>
        <span className={styles.logout} title="Logout">
          <span>
            {this.props.user.firstname} {this.props.user.lastname}
          </span>
          <span onClick={() => this.props.dispatch(logout())} ><i
            className="fa fa-sign-out"
            aria-hidden="true"

          /> Logout </span>
        </span>
      </header>
    )
  }
}
