import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { notify } from '../../../../../../../shell/store/notifications'
import {
  fetchBlueprints,
  updateBlueprint
} from '../../../../../../properties/src/store/blueprints'

import styles from './EditBlueprint.less'

class EditBlueprint extends Component {
  constructor(props) {
    super()
    this.state = {
      blueprint: {
        name: '',
        githubURL: '',
        description: '',
        shortDescription: '',
        previewURL: '',
        coverImage: '',
        mainImage: ''
      }
    }
  }

  componentWillReceiveProps(props) {
    console.log('static running', props)
    if (props.blueprint.ID !== this.state.blueprint.ID) {
      this.setState({
        blueprint: props.blueprint
      })
    } else {
      return null
    }
  }

  render() {
    return (
      this.state.blueprint && (
        <form id="edit-form" onSubmit={this.handleSubmit}>
          <div className={styles.blueprints}>
            <div className={styles.rowOne}>
              <label>Blueprint Name</label>
              <Input
                type="text"
                size={50}
                onChange={this.onChange}
                value={this.state.blueprint.name}
                name="name"
              />
              <label>Github Repo URL</label>
              <Input
                type="text"
                size={50}
                onChange={this.onChange}
                value={this.state.blueprint.githubURL}
                name="githubURL"
              />
              <label>Blueprint Example Preview URL</label>
              <Input
                type="text"
                size={50}
                onChange={this.onChange}
                value={this.state.blueprint.previewURL}
                name="previewURL"
              />
              <label>
                Shield Image URL (Optional. This will override shield.png in
                your repo.)
              </label>
              <Input
                type="text"
                size={50}
                onChange={this.onChange}
                value={this.state.blueprint.mainImage}
                name="mainImage"
              />
              <label>
                Background Cover Image URL (Optional. This will override
                shield.png in your repo.)
              </label>
              <Input
                size={50}
                onChange={this.onChange}
                value={this.state.blueprint.coverImage}
                name="coverImage"
              />
            </div>
            <h3 className={styles.description}>Description</h3>
            <div className={styles.rowTwo}>
              <label>Short Description</label>
              <textarea
                wrap="soft"
                name="shortDescription"
                onChange={this.onChange}
                value={this.state.blueprint.shortDescription}
              />
            </div>
            <div className={styles.rowTwo1}>
              <label>Description</label>
              <textarea
                wrap="soft"
                name="description"
                onChange={this.onChange}
                value={this.state.blueprint.description}
              />
            </div>
            // TODO: ternary to create vs save on ID
            <Button className={styles.bottom3} type="submit" text="Save" />
          </div>
        </form>
      )
    )
  }
  handleSubmit = evt => {
    // TODO: check if we are saving or updating based on ID?
    evt.preventDefault()
    this.props
      .dispatch(updateBlueprint(this.state.blueprint.ID, this.state.blueprint))
      .then(data => {
        this.props.dispatch(
          notify({
            type: 'success',
            message: 'successfully saved changes'
          })
        )
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            type: 'error',
            message: 'something went wrong saving your changes'
          })
        )
      })
  }
  onChange = evt => {
    return this.setState({
      blueprint: {
        ...this.state.blueprint,
        [evt.target.name]: evt.target.value
      }
    })
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blueprint: Object.keys(state.blueprints)
      .map(i => {
        if (
          parseInt(state.blueprints[i].ID, 10) ===
          parseInt(ownProps.match.params.id, 10)
        ) {
          return state.blueprints[i]
        }
      })
      .filter(i => i !== undefined)[0]
  }
}

export default EditBlueprint
