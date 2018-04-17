import { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './AppHeader.less'

import { logout } from '../../store/auth'

export default class AppHeader extends PureComponent {
  render() {
    return (
      <header className={styles.AppHeader}>
        <img className={styles.logo} src="/zesty-z-logo.svg" />
        <nav className={styles.GlobalNav}>
          <NavLink to="/properties">Web Properties</NavLink>
        </nav>
        <nav className={styles.UserNav}>
          <img
            className={styles.avatar}
            src={`https://www.gravatar.com/avatar/${
              this.props.user.email
            }?d=mm&s=30`}
          />
          <span className={styles.name}>
            {this.props.user.firstName} {this.props.user.lastName}
          </span>
          <ul className={styles.UserMenu}>
            <li>
              <NavLink to="/settings/account">
                <i className="fa fa-cog" aria-hidden="true" />
                &nbsp;My Account
              </NavLink>
            </li>
            <li
              className={styles.logout}
              title="Logout"
              onClick={() => this.props.dispatch(logout())}
            >
              <i className="fa fa-sign-out" aria-hidden="true" />
              &nbsp;Logout
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}
