import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateTeam from '../../components/CreateTeam'
import TeamCard from '../../components/TeamCard'

import styles from './TeamsGrid.less'
import InviteCard from '../InviteCard/'

export default connect(state => {
  return {
    user: state.user,
    teams: state.teams
  }
})(
  class TeamsGrid extends Component {
    state = {
      user: this.props.user
    }
    render() {
      return (
        <section className={styles.TeamsView}>
          <h1 className={styles.TeamsTitle}>
            <i className="fa fa-users" aria-hidden="true" />&nbsp; Manage Your
            Teams
          </h1>
          <div className={styles.TeamsGrid}>
            {/* creation card */}
            <CreateTeam dispatch={this.props.dispatch} />

            {/* invited teams */}
            {this.props.teams &&
              Object.keys(this.props.teams)
                .filter(team =>
                  this.props.teams[team].hasOwnProperty('teamInviteZUID')
                )
                .map((team, i) => (
                  <InviteCard
                    team={this.props.teams[team]}
                    dispatch={this.props.dispatch}
                    key={i}
                  />
                ))}

            {/* regular teams */}
            {this.props.teams &&
              Object.keys(this.props.teams)
                .filter(
                  team =>
                    !this.props.teams[team].hasOwnProperty('teamInviteZUID')
                )
                .map(team => {
                  return (
                    <TeamCard
                      dispatch={this.props.dispatch}
                      team={this.props.teams[team]}
                      key={this.props.teams[team].ZUID}
                      userZUID={this.props.user.ZUID}
                    />
                  )
                })}
          </div>
        </section>
      )
    }
  }
)
