import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import BlueprintEdit from './components/BlueprintEdit'
import SelectBlueprint from './components/SelectBlueprint'

import {
  fetchBlueprints,
  deleteBlueprint
} from '../../../../properties/src/store/blueprints'
import { zConfirm } from '../../../../../shell/store/confirm'
import { notify } from '../../../../../shell/store/notifications'

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
          handleDelete={this.handleDelete}
        />
        <BlueprintEdit
          userZUID={this.props.userZUID}
          dispatch={this.props.dispatch}
          blueprint={this.state.selected}
          history={this.props.history}
        />
      </section>
    )
  }
  handleSelect = blueprint => {
    this.props.history.push(`/settings/blueprints/${blueprint}`)
  }
  handleDelete = blueprint => {
    const name = this.props.blueprints[blueprint].name
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to delete this blueprint?',
        callback: response => {
          if (response) {
            this.props
              .dispatch(deleteBlueprint(blueprint, name))
              .then(data => {
                this.props.dispatch(fetchBlueprints())
                this.props.dispatch(
                  notify({
                    type: 'success',
                    message: 'Blueprint successfully removed'
                  })
                )
                this.props.history.push('/settings/blueprints/')
              })
              .catch(err => {
                this.props.dispatch(
                  notify({
                    type: 'error',
                    message: 'There was a problem deleting the blueprint'
                  })
                )
              })
          }
        }
      })
    )
  }
}

const mapStateToProps = state => {
  const blueprints = state.blueprints
  const userZUID = state.user.ZUID

  const userBlueprints = Object.keys(blueprints).reduce((acc, bp) => {
    if (state.blueprints[bp].createdByUserZUID === userZUID && !state.blueprints[bp].trashed) {
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
