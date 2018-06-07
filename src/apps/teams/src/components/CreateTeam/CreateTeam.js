import React, { Component } from 'react'

import styles from './create.less'
class CreateTeam extends Component {
  state = {
    name: '',
    invitees: ['', '', ''],
    submitted: false
  }
  render() {
    return (
      <Card className={styles.Card}>
        <CardHeader>Create Team</CardHeader>
        <CardContent>
          <p>
            Add multiple employees/users to a team and gain access to an
            instance together
          </p>
          <label>name team</label>
          <Input
            type="text"
            value={this.state.name}
            onChange={this.changeName}
          />
          <label>invite members by email</label>
          <section className={styles.inviteInputs}>
            {this.state.invitees.map((email, i) => {
              return (
                <Input
                  key={i}
                  name={i}
                  value={email}
                  onChange={this.addInvite}
                />
              )
            })}
          </section>
          <Button className={styles.addMember} onClick={this.addInvitee}>
            <i className="fa fa-user" />
            <p>Add Member</p>
          </Button>
        </CardContent>
        <CardFooter>
          <Button disabled={this.state.submitted} onClick={this.handleSubmit}>
            <i className="fa fa-plus" />
            Create Team
          </Button>
        </CardFooter>
      </Card>
    )
  }
  addInvitee = () => {
    const invitees = this.state.invitees
    invitees.push('')
    this.setState({ invitees })
  }
  addInvite = evt => {
    const invitees = this.state.invitees
    invitees.splice(Number(evt.target.name), 1, evt.target.value)
    this.setState({ invitees })
  }
  changeName = evt => {
    this.setState({ name: evt.target.value })
  }
  handleSubmit = evt => {}
}

export default CreateTeam
