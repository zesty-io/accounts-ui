import React, { Component } from 'react'

import { notify } from '../../../../../../../shell/store/notifications'
import {
  updateBlueprint,
  postNewBlueprint,
  fetchBlueprints
} from '../../../../../../properties/src/store/blueprints'

import styles from './BlueprintEdit.less'

class BlueprintEdit extends Component {
  state = {
    saving: false,
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
        <div className={styles.blueprints}>
          <label>Blueprint Name</label>
          <Input
            autoComplete="off"
            type="text"
            onChange={this.onChange}
            value={this.state.blueprint.name || ''}
            name="name"
          />
          <label>Github Repo URL</label>
          <Input
            autoComplete="off"
            type="text"
            onChange={this.onChange}
            value={this.state.blueprint.githubURL || ''}
            name="githubURL"
          />
          <label>Blueprint Example Preview URL</label>
          <Input
            autoComplete="off"
            type="text"
            onChange={this.onChange}
            value={this.state.blueprint.previewURL || ''}
            name="previewURL"
          />
          <label>
            Shield Image URL (Optional. This will override shield.png in your
            repo.)
          </label>
          <Input
            autoComplete="off"
            type="text"
            onChange={this.onChange}
            value={this.state.blueprint.mainImage || ''}
            name="mainImage"
          />
          <label>
            Background Cover Image URL (Optional. This will override shield.png
            in your repo.)
          </label>
          <Input
            autoComplete="off"
            onChange={this.onChange}
            value={this.state.blueprint.coverImage || ''}
            name="coverImage"
          />
          <section className={styles.descriptionWrapper}>
            <article>
              <label>Short Description</label>
              <textarea
                autoComplete="off"
                wrap="soft"
                name="shortDescription"
                onChange={this.onChange}
                value={this.state.blueprint.shortDescription || ''}
              />
            </article>
            <article>
              <label>Description</label>
              <textarea
                autoComplete="off"
                wrap="soft"
                name="description"
                onChange={this.onChange}
                value={this.state.blueprint.description || ''}
              />
            </article>
          </section>
          {this.state.blueprint.ID ? (
            <Button
              disabled={this.state.saving}
              className={styles.button}
              onClick={this.handleSubmit}
              type="submit"
              text="Save"
            />
          ) : (
            <Button
              disabled={this.state.saving}
              className={styles.button}
              onClick={this.handleCreate}
              type="submit"
            ><i className="fa fa-plus" /> Create</Button>
          )}
        </div>
      )
    )
  }
  handleSubmit = evt => {
    evt.preventDefault()
    this.setState({ saving: true })
    this.props
      .dispatch(updateBlueprint(this.state.blueprint.ID, this.state.blueprint))
      .then(data => {
        this.setState({ saving: false })
        this.props.dispatch(fetchBlueprints())
        this.props.dispatch(
          notify({
            type: 'success',
            message: 'successfully saved changes'
          })
        )
      })
      .catch(err => {
        this.setState({ saving: false })
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
    this.setState({ saving: true })
    const newBlueprint = {
      ...this.state.blueprint,
      createdByUserZUID: this.state.userZUID
    }
    this.props
      .dispatch(postNewBlueprint(newBlueprint))
      .then(data => {
        this.setState({ saving: false })
        this.props.dispatch(
          notify({
            type: 'success',
            message: 'successfully created blueprint'
          })
        )
      })
      .catch(err => {
        this.setState({ saving: false })
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
