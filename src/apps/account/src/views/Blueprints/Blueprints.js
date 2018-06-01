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
    console.log(this.props.match.params)
    if(this.props.match.params.id){
      console.log('have id')
    }
    // if there are no blueprints, fetch them
    if (!Object.keys(this.props.blueprints).length) {
      this.props.dispatch(fetchBlueprints())
    }
  }
  render() {
    return (
      <section className={styles.Blueprints}>
        <SelectBlueprint
          className={styles.List}
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
    if (blueprint === 'new') {
      return this.setState({ selected: 'new' })
    }
    this.setState({ selected: this.props.blueprints[blueprint] })
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
