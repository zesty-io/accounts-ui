import React, { Component } from 'react'
import { connect } from 'react-redux'

import { request } from '../../../../../util/request'

import CreateTeam from '../../components/CreateTeam'
import TeamList from '../../components/TeamList'
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
            {this.props.teams &&
              Object.keys(this.props.teams)
                .filter(
                  team => this.props.teams[team].hasOwnProperty('invited')
                )
                .map(team => <InviteCard team={this.props.teams[team]} />)}
            <CreateTeam />
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

export default connect(state => state)(Teams)
