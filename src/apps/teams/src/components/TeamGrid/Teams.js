import React, { Component } from 'react'
import { connect } from 'react-redux'

import { request } from '../../../../../util/request'

import CreateTeam from '../../components/CreateTeam'
import TeamList from '../../components/TeamList'
import TeamCard from '../../components/TeamCard'

import styles from './teams.less'
import { fetchTeams } from '../../store'

class Teams extends Component {
  state = {
    user: this.props.user
  }

  componentDidMount() {
    this.props.dispatch(fetchTeams(this.state.user.ZUID))
  }
  render() {
    return (
      // this.props.teams
      <section className={styles.Teams}>
        <h1 className={styles.TeamsTitle}>Manage Your Teams</h1>
        <div className={styles.Team}>
          <div className={styles.TeamCard}>
            <CreateTeam />
            {this.props.teams ? (
              Object.keys(this.props.teams).map(team => {
                return (
                  <TeamCard
                    className={styles.Card}
                    team={this.props.teams[team]}
                    key={this.props.teams[team].ZUID}
                  />
                )
              })
            ) : (
              <TeamCard className={styles.Card} team={this.props.teams[team]} />
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default connect(state => state)(Teams)
