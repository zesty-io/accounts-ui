import React, { Component } from 'react'

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
          {Object.keys(this.props.teamInvites).map(inviteZUID => (
            <InviteCard
              key={inviteZUID}
              dispatch={this.props.dispatch}
              invite={this.props.teamInvites[inviteZUID]}
            />
          ))}

          {/* regular teams */}
          {Object.keys(this.props.teams).map(teamZUID => (
            <TeamCard
              key={teamZUID}
              dispatch={this.props.dispatch}
              team={this.props.teams[teamZUID]}
              members={this.props.teams[teamZUID].members.map(
                memberZUID => this.props.teamMembers[memberZUID]
              )}
              instances={this.props.teamInstances[teamZUID]}
              user={this.props.user}
            />
          ))}
        </div>
      </section>
    )
  }
}
