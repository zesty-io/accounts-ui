import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import BlueprintEdit from './components/BlueprintEdit'
import SelectBlueprint from './components/SelectBlueprint'

import { postNewBlueprint } from '../../../../properties/src/store/blueprints'

import styles from './Blueprints.less'

class Blueprints extends Component {
  constructor(props) {
    super()
    this.state = {
      selection: ''
    }
  }
  render() {
    return (
      <section className={styles.BlueprintCreate}>
        <SelectBlueprint
          selection={this.state.selection}
          handleSelect={this.handleSelect}
        />
        <BlueprintEdit
          selection={this.state.selection}
          blueprint={this.props.blueprints[this.state.selection]}
        />
      </section>
    )
  }
  handleSelect = blueprint => {
    this.setState({ selected: blueprint })
  }
}

const mapStateToProps = state => {
  return state
}

export default withRouter(connect(state => state)(Blueprints))
