import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import { logout } from '../../store/auth'
// import { fetchSitesWithInvites } from '../../../apps/properties/src/store/sites'
// import { getUserTeamInvites } from '../../../apps/teams/src/store'

import styles from './AppHeader.less'
export default connect(state => {
  const teamArray = Object.keys(state.teams).reduce((acc, team) => {
    acc.push(state.teams[team])
    return acc
  }, [])
  const siteArray = Object.keys(state.sites).reduce((acc, site) => {
    acc.push(state.sites[site])
    return acc
  }, [])
  const user = state.user

  const userHasSiteInvites = Boolean(
    siteArray.filter(site => site.inviteZUID).length
  )
  const userHasTeamInvites = Boolean(
    teamArray.filter(team => team.teamInviteZUID).length
  )
  return { user, userHasSiteInvites, userHasTeamInvites }
})(
  class AppHeader extends Component {
    constructor(props) {
      super(props)
      this.state = {
        userNavOpen: ''
      }
    }

    componentDidMount() {
      document.addEventListener('click', this.closeUserNav)
      // this.props.dispatch(fetchSitesWithInvites())
      // this.props.dispatch(getUserTeamInvites())
    }
    componentWillUnmountMount() {
      document.removeEventListener('click', this.closeUserNav)
    }

    render() {
      return (
        <header className={styles.AppHeader}>
          <img className={styles.logo} src="/zesty-z-logo.svg" />
          <nav className={styles.GlobalNav} id="globalNav">
            <NavLink
              className={styles.sudheadline}
              to="/instances"
              data-test="instancesNavLink">
              <i className="fa fa-globe" aria-hidden="true" />
              &nbsp;Instances
              {this.props.userHasSiteInvites ? (
                <span>
                  &nbsp;
                  <i className={`fa fa-circle ${styles.red}`} />
                </span>
              ) : null}
            </NavLink>
            {this.props.user.prefs.teamOptions !== 0 && (
              <NavLink
                className={styles.sudheadline}
                to="/teams"
                data-test="teamsNavLink">
                <i className="fa fa-users" aria-hidden="true" />
                &nbsp;Teams
                {this.props.userHasTeamInvites ? (
                  <span>
                    &nbsp;
                    <i className={`fa fa-circle ${styles.red}`} />
                  </span>
                ) : null}
              </NavLink>
            )}
            {this.props.user.prefs.devOptions === 1 && (
              <NavLink
                className={styles.sudheadline}
                to="/blueprints"
                data-test="blueprintsNavLink">
                <i className="fa fa-map" aria-hidden="true" />
                &nbsp;Blueprints
              </NavLink>
            )}
          </nav>
          <nav
            ref={nav => (this.userNav = nav)}
            data-test="UserNav"
            className={cx(
              'UserNav',
              styles.UserNav,
              styles[this.state.userNavOpen]
            )}
            onClick={this.toggleUserNav}>
            {this.props.user.firstName} {this.props.user.lastName}
            <img
              className={styles.avatar}
              src={`https://www.gravatar.com/avatar/${this.props.user.emailHash}?d=mm&s=30`}
            />
            <ul className={styles.UserMenu} id="userNavDropdown">
              <li className={styles.user}>
                <span className={styles.email}>{this.props.user.email}</span>
              </li>

              <hr />

              <li>
                <NavLink to="/settings/account" data-test="accountNavLink">
                  <i className="fa fa-cog" aria-hidden="true" />
                  &nbsp;My Account
                </NavLink>
              </li>

              <li>
                <NavLink to="/support" data-test="supportNavLink">
                  <i className="far fa-life-ring"></i>&nbsp;Support
                </NavLink>
              </li>

              <hr />

              <li className={styles.logout}>
                <NavLink to="/logout" data-test="logoutNavLink">
                  <i className="fas fa-sign-out-alt"></i>
                  &nbsp;Sign Out
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
      )
    }

    toggleUserNav = evt => {
      this.setState({
        userNavOpen: this.state.userNavOpen === 'show' ? '' : 'show'
      })
    }

    closeUserNav = evt => {
      if (this.state.userNavOpen) {
        const parent = evt.target.closest('.UserNav')
        if (!parent || parent !== this.userNav) {
          this.setState({
            userNavOpen: ''
          })
        }
      }
    }
  }
)
