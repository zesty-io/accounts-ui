import React, { Component } from 'react'
import { connect } from 'react-redux'

import { request } from '../../../../../util/request'
import config from '../../../../../shell/config'

import CreateTeam from '../../components/CreateTeam'
import TeamList from '../../components/TeamList'

import styles from './teams.less'
import { fetchTeams } from '../../store';

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
            <TeamList />
          </div>
        </div>
      </section>
    )
  }
}

export default connect(state => state)(Teams)
