import React, { Component } from 'react'

import { notify } from '../../../../../../../shell/store/notifications'
import {
  updateBlueprint,
  postNewBlueprint
} from '../../../../../../properties/src/store/blueprints'

import styles from './BlueprintEdit.less'

class BlueprintEdit extends Component {
  state = {
    userZUID: this.props.userZUID,
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

  componentWillReceiveProps(props) {
    if (props.blueprint === 'create') {
      return this.setState({
        blueprint: {
          name: '',
          githubURL: '',
          description: '',
          shortDescription: '',
          previewURL: '',
          coverImage: '',
          mainImage: ''
        }
      })
    }
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
        <div>
          <div className={styles.blueprints}>
            <div className={styles.rowOne}>
              <label>Blueprint Name</label>
              <Input
                autoComplete="off"
                type="text"
                size={50}
                onChange={this.onChange}
                value={this.state.blueprint.name || ''}
                name="name"
              />
              <label>Github Repo URL</label>
              <Input
                autoComplete="off"
                type="text"
                size={50}
                onChange={this.onChange}
                value={this.state.blueprint.githubURL || ''}
                name="githubURL"
              />
              <label>Blueprint Example Preview URL</label>
              <Input
                autoComplete="off"
                type="text"
                size={50}
                onChange={this.onChange}
                value={this.state.blueprint.previewURL || ''}
                name="previewURL"
              />
              <label>
                Shield Image URL (Optional. This will override shield.png in
                your repo.)
              </label>
              <Input
                autoComplete="off"
                type="text"
                size={50}
                onChange={this.onChange}
                value={this.state.blueprint.mainImage || ''}
                name="mainImage"
              />
              <label>
                Background Cover Image URL (Optional. This will override
                shield.png in your repo.)
              </label>
              <Input
                autoComplete="off"
                size={50}
                onChange={this.onChange}
                value={this.state.blueprint.coverImage || ''}
                name="coverImage"
              />
            </div>
            <h3 className={styles.description}>Description</h3>
            <div className={styles.rowTwo}>
              <label>Short Description</label>
              <textarea
                autoComplete="off"
                wrap="soft"
                name="shortDescription"
                onChange={this.onChange}
                value={this.state.blueprint.shortDescription || ''}
              />
            </div>
            <div className={styles.rowTwo1}>
              <label>Description</label>
              <textarea
                autoComplete="off"
                wrap="soft"
                name="description"
                onChange={this.onChange}
                value={this.state.blueprint.description || ''}
              />
            </div>
            {this.state.blueprint.ID ? (
              <Button
                className={styles.bottom3}
                onClick={this.handleSubmit}
                type="submit"
                text="Save"
              />
            ) : (
              <Button
                className={styles.bottom3}
                onClick={this.handleCreate}
                type="submit"
                text="Create"
              />
            )}
          </div>
        </div>
      )
    )
  }
  handleSubmit = evt => {
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
  handleCreate = evt => {
    evt.preventDefault()
    const newBlueprint = {...this.state.blueprint, createdByUserZUID: this.state.userZUID}
    this.props
      .dispatch(postNewBlueprint(newBlueprint))
      .then(data => {
        console.log(data)
        this.props.dispatch(
          notify({
            type: 'success',
            message: 'successfully created blueprint'
          })
        )
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            type: 'error',
            message: 'something went wrong creating the blueprint'
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

export default BlueprintEdit
