import { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import styles from './AppHeader.less'

import { logout } from '../../store/auth'
// import { fetchSitesWithInvites } from '../../../apps/properties/src/store/sites'
// import { getUserTeamInvites } from '../../../apps/teams/src/store'

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
          <NavLink to="/instances" id="instancesNavLink">
            <i className="fa fa-globe" aria-hidden="true" />
            &nbsp;Instances{this.props.userHasSiteInvites ? (
              <span>
                &nbsp;<i className={`fa fa-circle ${styles.red}`} />
              </span>
            ) : null}
          </NavLink>
          {this.props.user.prefs.teamOptions === 1 && (
            <NavLink to="/teams" id="teamsNavLink">
              <i className="fa fa-users" aria-hidden="true" />
              &nbsp;Teams
              {this.props.userHasTeamInvites ? (
                <span>
                  &nbsp;<i className={`fa fa-circle ${styles.red}`} />
                </span>
              ) : null}
            </NavLink>
          )}
          {this.props.user.prefs.devOptions === 1 && (
            <NavLink to="/blueprints" id="blueprintsNavLink">
              <i className="fa fa-map" aria-hidden="true" />
              &nbsp;Blueprints
            </NavLink>
          )}
        </nav>
        <nav className={styles.LegacyLink}>
          <Url
            href={CONFIG.LEGACY_ACCOUNTS}
            title="Return to the legacy accounts application">
            <i className="fa fa-info-circle" aria-hidden="true" />&nbsp;Legacy
            Accounts
          </Url>
        </nav>
        <nav
          ref={nav => (this.userNav = nav)}
          className={cx(
            'UserNav',
            styles.UserNav,
            styles[this.state.userNavOpen]
          )}
          onClick={this.toggleUserNav}>
          {this.props.user.firstName} {this.props.user.lastName}
          <img
            className={styles.avatar}
            src={`https://www.gravatar.com/avatar/${
              this.props.user.emailHash
            }?d=mm&s=30`}
          />
          <ul className={styles.UserMenu} id="userNavDropdown">
            <li className={styles.user}>
              <span className={styles.name}>
                {this.props.user.firstName} {this.props.user.lastName}
              </span>
              <span className={styles.email}>{this.props.user.email}</span>
            </li>

            <hr />

            <li>
              <NavLink to="/settings/account">
                <i className="fa fa-cog" aria-hidden="true" /> My Account
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
              onClick={() => this.props.dispatch(logout())}>
              <i className="fa fa-sign-out" aria-hidden="true" />
              &nbsp;Logout
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
const mapStateToProps = state => {
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
}

export default connect(mapStateToProps)(AppHeader)
