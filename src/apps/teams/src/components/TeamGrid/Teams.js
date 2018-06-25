import React, { Component } from 'react'
import { connect } from 'react-redux'

import { request } from '../../../../../util/request'

import CreateTeam from '../../components/CreateTeam'
import TeamCard from '../../components/TeamCard'

import styles from './teams.less'
import { fetchTeams } from '../../store'
import InviteCard from '../InviteCard/'

class Teams extends Component {
  state = {
    user: this.props.user
  }

  componentDidMount() {
    this.props.dispatch(fetchTeams(this.state.user.ZUID))
  }
  render() {
    return (
      <section className={styles.Teams}>
        <h1 className={styles.TeamsTitle}>Manage Your Teams</h1>
        <div className={styles.Team}>
          <div className={styles.TeamCard}>
            {/* invited teams first */}
            {this.props.teams &&
              Object.keys(this.props.teams)
                .filter(team =>
                  this.props.teams[team].hasOwnProperty('invited')
                )
                .map(team => <InviteCard team={this.props.teams[team]} />)}
            {/* creation card */}
            <CreateTeam />
            {/* regular teams */}
            {this.props.teams &&
              Object.keys(this.props.teams)
                .filter(
                  team => !this.props.teams[team].hasOwnProperty('invited')
                )
                .map(team => {
                  return (
                    <TeamCard
                      className={styles.Card}
                      team={this.props.teams[team]}
                      key={this.props.teams[team].ZUID}
                    />
                  )
                })}
          </div>
        </div>
      </section>
    )
  }
}
const mapStateToProps = state => {
  // separate invited, admin and non-admin teams
  const adminTeams = {} // teams that a user is an admin for
  const lockedTeams = {} // teams the user is only a member of
  const invitedTeams = {} // teams a suer has not accepted an invite to
  return state
}

export default connect(mapStateToProps)(Teams)
