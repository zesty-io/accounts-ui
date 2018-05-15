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

  componentDidMount() {
    document.addEventListener('click', this.closeUserNav)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeUserNav)
  }

  render() {
    return (
      <header className={styles.AppHeader}>
        <img className={styles.logo} src="/zesty-z-logo.svg" />
        <nav className={styles.GlobalNav}>
          <NavLink to="/properties">
            <i className="fa fa-globe" aria-hidden="true" />
            &nbsp;Web Properties
          </NavLink>
          <NavLink to="/teams">
            <i className="fa fa-users" aria-hidden="true" />
            &nbsp;Teams
          </NavLink>
        </nav>
        {/* <nav className={styles.HelpNav}>
          <a href="https://developer.zesty.io" target="_blank">
            <i className={cx(styles.icon, "fa fa-question-circle")} aria-hidden="true"></i>
          </a>
        </nav> */}
        <nav
          id="GlobalUserNav"
          className={cx(styles.UserNav, styles[this.state.userNavOpen])}
          onClick={this.openUserNav}
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
              <NavLink to="/support">
                <i
                  className={cx(styles.icon, 'fa fa-question-circle')}
                  aria-hidden="true"
                />{' '}
                Support
              </NavLink>
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

  /**
   * Recursively walk the DOM tree to determine
   * if click occured within or outside of the
   * user nav list to figure out if we should close it
   */
  closeUserNav = (evt, el) => {
    if (this.state.userNavOpen) {
      if (evt) {
        if (evt.target.id !== 'GlobalUserNav') {
          const found = this.closeUserNav(null, evt.target.parentElement)
          if (!found) {
            this.setState({
              userNavOpen: ''
            })
          }
        }
      } else {
        if (el.id === 'GlobalUserNav') {
          return true
        } else if (el.parentElement) {
          return this.closeUserNav(null, el.parentElement)
        }
      }
    }
  }
  openUserNav = evt => {
    this.setState({
      userNavOpen: 'show'
    })
  }
}
