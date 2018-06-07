import React, { Component } from 'react'
import { connect } from 'react-redux'

import { request } from '../../../../../util/request'

import TeamList from '../../components/TeamList'
import TeamGrid from '../../components/TeamGrid'

import { fetchTeams } from '../../store'

import styles from './teams.less'
class Teams extends Component {
  state = {
    user: this.props.user,
    loading: true
  }

  componentDidMount() {
    this.props
      .dispatch(fetchTeams(this.state.user.ZUID))
      .then(() => this.setState({ loading: false }))
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
