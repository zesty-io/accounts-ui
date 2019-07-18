import React, { Component } from 'react'

import BlueprintList from '../BlueprintList'

import AppLink from '../../../../../core/AppLink'

import { notify } from '../../../../../shell/store/notifications'
import {
  updateBlueprint,
  createBlueprint,
  fetchBlueprints
} from '../../../../properties/src/store/blueprints'

import styles from './BlueprintEdit.less'
class BlueprintEdit extends Component {
  state = {
    saving: false,
    userZUID: this.props.userZUID,
    blueprint: ''
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.blueprint === 'create' &&
      !state.blueprint.hasOwnProperty('name')
    ) {
      return {
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
    if (props.blueprint.ID !== state.blueprint.ID) {
      return {
        blueprint: props.blueprint
      }
    } else {
      return null
    }
  }

  render() {
    return (
      <form id="Blueprint" className={styles.BlueprintEdit}>
        <AppLink to="/blueprints">
          <i className="fa fa-long-arrow-left" aria-hidden="true" />
          &nbsp;Back to overview
        </AppLink>

        <label>
          Blueprint Name
          <Input
            autoComplete="off"
            type="text"
            onChange={this.onChange}
            placeholder="ACME Co. Micro Site"
            value={this.state.blueprint.name}
            name="name"
          />
        </label>

        <label>
          Github Repo URL
          <em>
            Looking for a Blueprint? Try starting with one of our{' '}
            <Url href="https://github.com/zesty-io?q=plate" target="_blank">
              Zesty.io blueprints
            </Url>
            .
          </em>
          <Input
            required
            autoComplete="off"
            type="text"
            onChange={this.onChange}
            placeholder="https://github.com/zesty-io/plate-material-ui"
            value={this.state.blueprint.githubURL}
            name="githubURL"
          />
        </label>

        <label>
          Cover Image URL
          <em>Primary. This will override cover.png in your repo.</em>
          <Input
            autoComplete="off"
            onChange={this.onChange}
            value={this.state.blueprint.coverImage}
            name="coverImage"
          />
        </label>

        <label>
          Shield Image URL
          <em>Optional. This will override shield.png in your repo.</em>
          <Input
            autoComplete="off"
            type="text"
            onChange={this.onChange}
            value={this.state.blueprint.mainImage}
            name="mainImage"
          />
        </label>

        <label>
          Blueprint Example Preview URL
          <em>
            Optional. By providing a Zesty.io instance which has implemented
            your blueprint you can allow users you share blueprints with to
            preview them before selecting during instance creation.
          </em>
          <Input
            autoComplete="off"
            type="text"
            onChange={this.onChange}
            value={this.state.blueprint.previewURL}
            name="previewURL"
          />
        </label>

        <label className={styles.ShortDescription}>
          Short Description
          <textarea
            autoComplete="off"
            wrap="soft"
            name="shortDescription"
            onChange={this.onChange}
            value={this.state.blueprint.shortDescription}
          />
        </label>

        <label>
          Description
          <textarea
            autoComplete="off"
            wrap="soft"
            name="description"
            onChange={this.onChange}
            value={this.state.blueprint.description}
          />
        </label>

        <ButtonGroup className={styles.Actions}>
          {this.state.blueprint.ID ? (
            <Button
              disabled={this.state.saving}
              className={styles.button}
              onClick={this.handleSubmit}
              form="Blueprint"
              type="submit">
              <i className="fa fa-save" /> Save Blueprint
            </Button>
          ) : (
            <Button
              disabled={this.state.saving}
              className={styles.button}
              onClick={this.handleCreate}
              form="Blueprint"
              type="submit">
              <i className="fa fa-plus" /> Create New Blueprint
            </Button>
          )}
          <Button
            disabled={this.state.saving}
            className={styles.button}
            onClick={() => {
              this.props.history.push('/blueprints')
            }}>
            <i className="fa fa-ban" /> Cancel
          </Button>
        </ButtonGroup>
      </form>
    )
  }
  handleSubmit = evt => {
    evt.preventDefault()
    this.setState({ saving: true })
    this.props
      .dispatch(updateBlueprint(this.state.blueprint.ID, this.state.blueprint))
      .then(data => {
        this.setState({ saving: false })
        this.props
          .dispatch(fetchBlueprints())
          .then(() => {
            this.props.dispatch(
              notify({
                type: 'success',
                message: 'Successfully saved changes'
              })
            )
          })
          .catch(() => {
            this.props.dispatch(
              notify({ message: 'Error fetching blueprints', type: 'error' })
            )
          })
      })
      .catch(err => {
        this.setState({ saving: false })
        this.props.dispatch(
          notify({
            type: 'error',
            message: 'There was an error saving your changes'
          })
        )
      })
  }
  handleCreate = evt => {
    evt.preventDefault()
    this.setState({ saving: true })
    const newBlueprint = this.props
      .dispatch(
        createBlueprint({
          ...this.state.blueprint,
          createdByUserZUID: this.state.userZUID
        })
      )
      .then(data => {
        this.setState({ saving: false })
        this.props.dispatch(
          notify({
            type: 'success',
            message: 'Successfully created blueprint'
          })
        )
        this.props.history.push('/blueprints')
      })
      .catch(err => {
        this.setState({ saving: false })
        this.props.dispatch(
          notify({
            type: 'error',
            message: 'There was an error creating the blueprint'
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
