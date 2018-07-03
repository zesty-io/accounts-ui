import React, { Component } from 'react'
import { connect } from 'react-redux'

import { request } from '../../../../../util/request'

import TeamGrid from '../../components/TeamGrid'

import { fetchTeams, getUserTeamInvites } from '../../store'

import styles from './teams.less'
class Teams extends Component {
  state = {
    user: this.props.user,
    loading: true
  }

  componentDidMount() {
    Promise.all([
      this.props.dispatch(getUserTeamInvites()),
      this.props.dispatch(fetchTeams())
    ]).then(() => this.setState({ loading: false }))
  }
  render() {
    return (
      <WithLoader
        className={styles.Loading}
        condition={!this.state.loading}
        message="Loading Your Teams">
        <TeamGrid />
      </WithLoader>
    )
  }
}

export default connect(state => state)(Teams)
