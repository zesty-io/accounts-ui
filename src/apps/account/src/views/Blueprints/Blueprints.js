import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import BlueprintEdit from './components/BlueprintEdit'
import SelectBlueprint from './components/SelectBlueprint'

import { fetchBlueprints } from '../../../../properties/src/store/blueprints'

import styles from './Blueprints.less'

class Blueprints extends Component {
  state = {
    selected: ''
  }
  componentDidMount() {
    // if there are no blueprints, fetch them
    if (!Object.keys(this.props.blueprints).length) {
      this.props.dispatch(fetchBlueprints())
    }
    const bp = this.props.match.params.id
    if (Object.keys(this.props.blueprints).length && bp) {
      if (bp === 'create') {
        return this.setState({ selected: 'create' })
      }
      this.setState({ selected: this.props.blueprints[bp] })
    }
  }
  componentWillReceiveProps(props) {
    const bp = props.match.params.id
    if (Object.keys(props.blueprints).length && bp) {
      if (bp === 'create') {
        return this.setState({ selected: 'create' })
      }
      this.setState({ selected: props.blueprints[bp] })
    }
  }
  render() {
    return (
      <section className={styles.Blueprints}>
        <SelectBlueprint
          blueprints={this.props.userBlueprints}
          selection={this.state.selected}
          handleSelect={this.handleSelect}
        />
        <BlueprintEdit
          userZUID={this.props.userZUID}
          dispatch={this.props.dispatch}
          blueprint={this.state.selected}
        />
      </section>
    )
  }
  handleSelect = blueprint => {
    this.props.history.push(`${blueprint}`)
  }
}

const mapStateToProps = state => {
  const blueprints = state.blueprints
  const userZUID = state.user.ZUID

  const userBlueprints = Object.keys(blueprints).reduce((acc, bp) => {
    if (state.blueprints[bp].createdByUserZUID === userZUID) {
      acc.push(blueprints[bp])
    }
    return acc
  }, [])

  return {
    blueprints,
    userBlueprints,
    userZUID
  }
}

export default withRouter(connect(mapStateToProps)(Blueprints))
