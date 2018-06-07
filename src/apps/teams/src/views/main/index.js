import React, { Component } from 'react'
import { connect } from 'react-redux'

import { request } from '../../../../../util/request'

import TeamList from '../../components/TeamList'
import TeamGrid from '../../components/TeamGrid'

import { fetchTeams } from '../../store'

class Teams extends Component {
  state = {
    user: this.props.user
  }

  componentDidMount() {
    this.props.dispatch(fetchTeams(this.state.user.ZUID))
  }
  render() {
    return <TeamGrid />
  }
}

export default connect(state => state)(Teams)
