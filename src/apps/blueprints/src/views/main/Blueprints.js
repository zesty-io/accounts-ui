import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'

import BlueprintEdit from '../../components/BlueprintEdit'
import BlueprintList from '../../components/BlueprintList'

import {
  fetchBlueprints,
  deleteBlueprint
} from '../../../../properties/src/store/blueprints'
import { zConfirm } from '../../../../../shell/store/confirm'
import { notify } from '../../../../../shell/store/notifications'

import { WithLoader } from '@zesty-io/core/WithLoader'

import styles from './Blueprints.less'
class Blueprints extends Component {
  state = {
    selected: '',
    loadingBlueprints: true,
    userBlueprints: {}
  }
  componentDidMount() {
    // if there are no blueprints, fetch them
    if (!Object.keys(this.props.userBlueprints).length) {
      this.props
        .dispatch(fetchBlueprints())
        .then(() => this.setState({ loadingBlueprints: false }))
        .catch(() => {
          this.props.dispatch(
            notify({ message: 'Error fetching blueprints', type: 'error' })
          )
        })
    } else {
      this.setState({ loadingBlueprints: false })
    }
    const bp = this.props.match.params.id
    if (Object.keys(this.props.blueprints).length && bp) {
      if (bp === 'create') {
        return this.setState({ selected: 'create' })
      }
      this.setState({ selected: this.props.blueprints[bp] })
    }
    this.setState({ userBlueprints: this.props.userBlueprints })
  }

  static getDerivedStateFromProps(props, state) {
    const bp = props.match.params.id
    if (Object.keys(props.blueprints).length && bp) {
      if (bp === 'create') {
        return { selected: 'create' }
      }
      return { ...state, selected: props.blueprints[bp] }
    }
    if (
      Object.keys(props.userBlueprints).length !==
      Object.keys(state.userBlueprints).length
    ) {
      return { ...state, userBlueprints: props.userBlueprints }
    } else {
      return null
    }
  }
  render() {
    return (
      <WithLoader
        className={styles.Loading}
        condition={!this.state.loadingBlueprints}
        message="Loading Your Custom Blueprints">
        <section className={styles.Blueprints}>
          <h1 className={styles.BlueprintsTitle}>
            Manage Your Custom Blueprints
          </h1>
          <Switch>
            <Route
              exact
              path="/blueprints"
              render={() => {
                return (
                  <BlueprintList
                    handleDelete={this.handleDelete}
                    userBlueprints={this.state.userBlueprints}
                  />
                )
              }}
            />
            <Route
              path="/blueprints/:id"
              render={() => {
                return (
                  <BlueprintEdit
                    userZUID={this.props.userZUID}
                    blueprints={this.state.userBlueprints}
                    dispatch={this.props.dispatch}
                    blueprint={this.state.selected}
                    history={this.props.history}
                  />
                )
              }}
            />
          </Switch>
        </section>
      </WithLoader>
    )
  }
  handleSelect = blueprint => {
    this.props.history.push(`/blueprints/${blueprint}`)
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
                this.props.dispatch(
                  notify({
                    type: 'success',
                    message: 'Blueprint successfully removed'
                  })
                )
                this.props.history.push('/blueprints/')
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
    if (
      state.blueprints[bp].createdByUserZUID === userZUID &&
      !state.blueprints[bp].trashed
    ) {
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
