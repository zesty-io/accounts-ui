import React, { Component } from 'react'
// import { connect } from 'react-redux'

import CreateTeam from '../../components/CreateTeam'
import TeamCard from '../../components/TeamCard'

import styles from './TeamsGrid.less'
import InviteCard from '../InviteCard/'

export default class TeamsGrid extends Component {
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
          {Object.keys(this.props.teamInvites).map(teamZUID => (
            <InviteCard
              key={teamZUID}
              dispatch={this.props.dispatch}
              team={this.props.teamInvites[teamZUID]}
            />
          ))}

          {/* regular teams */}
          {this.props.teams &&
            Object.keys(this.props.teams).map(teamZUID => {
              return (
                <TeamCard
                  key={teamZUID}
                  dispatch={this.props.dispatch}
                  team={this.props.teams[teamZUID]}
                  userZUID={this.props.user.ZUID}
                />
              )
            })}
        </div>
      </section>
    )
  }
}
