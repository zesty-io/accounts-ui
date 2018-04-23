import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import styles from './AppHeader.less'

import { logout } from '../../store/auth'

export default class AppHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userNavOpen: ''
    }
  }
  render() {
    return (
      <header className={styles.AppHeader}>
        <img className={styles.logo} src="/zesty-z-logo.svg" />
        <nav className={styles.GlobalNav}>
          <NavLink to="/properties">Web Properties</NavLink>
        </nav>
        {/* <nav className={styles.HelpNav}>
          <a href="https://developer.zesty.io" target="_blank">
            <i className={cx(styles.icon, "fa fa-question-circle")} aria-hidden="true"></i>
          </a>
        </nav> */}
        <nav
          className={cx(styles.UserNav, styles[this.state.userNavOpen])}
          onClick={this.showUserNav}
        >
          {this.props.user.firstName} {this.props.user.lastName}
          <img
            className={styles.avatar}
            src={`https://www.gravatar.com/avatar/${
              this.props.user.emailHash
            }?d=mm&s=30`}
          />
          <ul className={styles.UserMenu}>
            <li className={styles.user}>
              <span className={styles.name}>
                {this.props.user.firstName} {this.props.user.lastName}
              </span>
              <span className={styles.email}>{this.props.user.email}</span>
            </li>

            <hr />

            <li>
              <NavLink to="/settings/account">
                <i className="fa fa-cog" aria-hidden="true" />
                &nbsp;My Account
              </NavLink>
            </li>

            <li>
              <a href="https://developer.zesty.io" target="_blank">
                <i
                  className={cx(styles.icon, 'fa fa-question-circle')}
                  aria-hidden="true"
                />{' '}
                Support
              </a>
            </li>

            <hr />

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
  showUserNav = evt => {
    this.setState({
      userNavOpen: this.state.userNavOpen === 'show' ? '' : 'show'
    })
  }
}
