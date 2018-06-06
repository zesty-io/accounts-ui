import React, { Component } from 'react'

import styles from './create.less'
class CreateTeam extends Component {
  render() {
    return (
      <Card className={styles.Card}>
        <CardHeader>Create Team</CardHeader>
        <CardContent>
          <p>
            Create a team to add multiple employees/users to gain acess to a
            site altogether
          </p>
          <label>name team</label>
          <Input type="text" />
          <label>invite members by email</label>
          <Input type="text" />
          <Input type="text" />
          <Input type="text" />
          <Input type="text" />
          <Input type="text" />
          <Button
            onClick={() => console.log('click', team.ZUID)}
            text="Invite"
          />
        </CardContent>
        <CardFooter />
      </Card>
    )
  }
}

export default CreateTeam
