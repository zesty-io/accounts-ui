import React, { Component } from 'react'

import { createTeam } from '../../store'

import styles from './CreateTeam.less'
import { notify } from '../../../../../shell/store/notifications'
class CreateTeam extends Component {
  state = {
    name: '',
    description: '',
    submitted: false
  }
  render() {
    return (
      <Card className={styles.Card}>
        <CardHeader className={styles.CardHeader}>
          <h1>Create Team</h1>
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <section>
            <p>
              Teams allow providing a group of users access to an instance. By
              creating a team you can invite other Zesty.io users to your team
              by their email. Once you have built your team you can share your
              team ID with instance owners to let them give your team access.
            </p>

            <Url href="#">Learn How Teams Work</Url>

            {/* <p>
              Teams can be invited to a role on an instance by using the invite
              code Once the invitation is accepted by the team admin, all users
              in the team have access to the instance
            </p> */}
            {/* <p>Learn More:</p>
            <a href="#">link to docs</a>
            <br />
            <a href="#">link to walk through</a> */}
          </section>
          <section className={styles.Inputs}>
            <label>Team Name:</label>
            <Input
              type="text"
              name="name"
              autoComplete="off"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label>Description of your team:</label>
            <textarea
              rows="4"
              cols="50"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </section>
        </CardContent>
        <CardFooter>
          <Button
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
  // addInvitee = () => {
  //   const invitees = this.state.invitees
  //   invitees.push('')
  //   this.setState({ invitees })
  // }
  // addInviteField = evt => {
  //   const invitees = this.state.invitees
  //   invitees.splice(Number(evt.target.name), 1, evt.target.value)
  //   this.setState({ invitees })
  // }
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

export default CreateTeam
