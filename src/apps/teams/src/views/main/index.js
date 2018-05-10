import React, { Component } from 'react'
import { connect } from 'react-redux'

import { request } from '../../../../../util/request'
import config from '../../../../../shell/config'

import CreateTeam from '../../components/CreateTeam'
import TeamList from '../../components/TeamList'

import styles from './teams.less'

class Teams extends Component {
  state = {
    userInfo: this.props.user
  }

  render() {
    return (
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

export default connect(state => {
  return { user: state.user }
})(Teams)
