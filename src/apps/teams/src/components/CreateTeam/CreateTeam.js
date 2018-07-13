import React, { Component } from 'react'

import { createTeam } from '../../store/teams'
import { notify } from '../../../../../shell/store/notifications'

import styles from './CreateTeam.less'

export default class CreateTeam extends Component {
  state = {
    name: '',
    description: '',
    submitted: false
  }
  render() {
    return (
      <Card className={styles.CreateTeam}>
        <CardHeader>
          <h3>Teams</h3>
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <section>
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
            <label>
              <span>Team name:</span>
              <Input
                id="teamCreateName"
                type="text"
                name="name"
                autoComplete="off"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>

            <label>
              <span>Description of your team:</span>
              <textarea
                id="teamCreateDescription"
                rows="4"
                cols="50"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
          </section>
        </CardContent>
        <CardFooter>
          <Button
            id="teamCreateSave"
            type="save"
            disabled={this.state.submitted}
            onClick={this.handleSubmit}>
            <i className="fa fa-plus" />
            Create Team
          </Button>
        </CardFooter>
      </Card>
    )
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleSubmit = evt => {
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
      })
  }
}
