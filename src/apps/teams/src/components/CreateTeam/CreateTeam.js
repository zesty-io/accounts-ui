import React, { Component } from 'react'

import { createTeam } from '../../store/teams'
import { notify } from '../../../../../shell/store/notifications'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { TextFieldType } from '@zesty-io/core/TextFieldType'
import { TextareaFieldType } from '@zesty-io/core/TextareaFieldType'
import { Button } from '@zesty-io/core/Button'

import styles from './CreateTeam.less'
export default class CreateTeam extends Component {
  state = {
    name: '',
    description: '',
    submitted: false
  }
  handleChange = (name, value) => {
    this.setState({ [name]: value })
  }
  handleSubmit = _ => {
    if (!this.state.name) {
      return this.props.dispatch(
        notify({
          type: 'error',
          message: 'Team must have a name'
        })
      )
    }
    if (this.state.name.length > 50) {
      return this.props.dispatch(
        notify({
          type: 'error',
          message: 'Team name must be less than 50 characters'
        })
      )
    }
    if (this.state.description.length > 100) {
      return this.props.dispatch(
        notify({
          type: 'error',
          message: 'Team description must be less than 100 characters'
        })
      )
    }
    this.props
      .dispatch(createTeam(this.state.name, this.state.description))
      .then(() => {
        this.setState({ name: '', description: '' })
        this.props.dispatch(
          notify({ message: 'Team created', type: 'success' })
        )
      })
      .catch(() => {
        this.props.dispatch(
          notify({ message: 'Error creating team', type: 'error' })
        )
      })
  }
  render() {
    return (
      <Card className={styles.CreateTeam}>
        <CardHeader>
          <h3>Teams</h3>
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <section className={styles.description}>
            <p>
              Teams are a great way to manage multiple users who need to access
              an instance.
            </p>

            <p>
              Once you have created a team you can share your team ID with an
              instance owner to let them select a role and invite your team to
              their instance. This will allow you to manage who has access to an
              instance without needing the instance owner or admin.
            </p>

            {/* <Url href="#">Learn How Teams Work</Url> */}
          </section>
          <section className={styles.Team}>
            <TextFieldType
              name="name"
              label="Team Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <TextareaFieldType
              name="description"
              label="Description of your team"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </section>
        </CardContent>
        <CardFooter>
          <Button
            id="teamCreateSave"
            kind="save"
            disabled={this.state.submitted}
            onClick={this.handleSubmit}>
            <i className="fa fa-plus" />
            Create Team
          </Button>
        </CardFooter>
      </Card>
    )
  }
}
