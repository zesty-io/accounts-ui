import React, { Component } from 'react'
import { connect } from 'react-redux'

import { request } from '../../../../../util/request'

import TeamList from '../../components/TeamList'
import TeamGrid from '../../components/TeamGrid'

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
        <section className={styles.Teams}>
          <TeamList
            teams={this.props.teams}
          />
          <TeamGrid
          />
        </section>
      )
  }
}

export default connect(state => state)(Teams)
