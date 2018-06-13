import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'

import BlueprintEdit from '../../components/BlueprintEdit'
import BlueprintList from '../../components/BlueprintList'
import SelectBlueprint from '../../components/SelectBlueprint'

import {
  fetchBlueprints,
  deleteBlueprint
} from '../../../../properties/src/store/blueprints'
import { zConfirm } from '../../../../../shell/store/confirm'
import { notify } from '../../../../../shell/store/notifications'

import styles from './Blueprints.less'
class Blueprints extends Component {
  state = {
    selected: '',
    loading: true
  }
  componentDidMount() {
    // if there are no blueprints, fetch them
    if (!Object.keys(this.props.userBlueprints).length) {
      this.props
        .dispatch(fetchBlueprints())
        .then(() => this.setState({ loading: false }))
    } else {
      this.setState({ loading: false })
    }
    const bp = this.props.match.params.id
    if (Object.keys(this.props.blueprints).length && bp) {
      if (bp === 'create') {
        return this.setState({ selected: 'create' })
      }
      this.setState({ selected: this.props.blueprints[bp] })
    }
  }
  static getDerivedStateFromProps(props, state) {
    const bp = props.match.params.id
    if (Object.keys(props.blueprints).length && bp) {
      if (bp === 'create') {
        return { selected: 'create' }
      }
      return { selected: props.blueprints[bp] }
    }
    return null
  }
  render() {
    return (
      <section className={styles.Blueprints}>
        <SelectBlueprint
          blueprints={this.props.userBlueprints}
          handleDelete={this.handleDelete}
          handleSelect={this.handleSelect}
        />
        <Switch>
          <Route
            exact
            path="/blueprints"
            render={() => {
              return (
                <BlueprintList
                  loadingBlueprints={this.state.loading}
                  userBlueprints={this.props.userBlueprints}
                />
              )
            }}
          />
          <Route
            path="/blueprints/:id"
            render={() => {
              return (
                <BlueprintEdit
                  loadingBlueprints={this.state.loading}
                  userZUID={this.props.userZUID}
                  blueprints={this.props.userBlueprints}
                  dispatch={this.props.dispatch}
                  blueprint={this.state.selected}
                  history={this.props.history}
                />
              )
            }}
          />
        </Switch>
      </section>
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
                this.props.dispatch(fetchBlueprints())
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

  // if (Object.keys(blueprints).length && !userBlueprints.length) {
  //   userBlueprints.push({})
  // }
  return {
    blueprints,
    userBlueprints,
    userZUID
  }
}

export default withRouter(connect(mapStateToProps)(Blueprints))
