import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './style.less'
class UserAccess extends Component {
  componentWillUnmount(){
    this.props.dispatch({ type: 'CLEAR_USERS' })
  }
  render() {
    return (
      <div className={styles.userAccess}>
        <Input name='newUser' type='text' />
        <Button name='newUserSubmit'>Send Invite</Button>
        <div className ={styles.userTable}>
        <header>
                <h3>First Name</h3>
                <h3>Last Name</h3>
                <h3>Email</h3>
                <h3>Staff</h3>
              </header>
              <main>
              {Array.isArray(this.props.sitesUsers)
              ? this.props.sitesUsers.map((user, i) => {
                  return (<article key={i}>
                    <span>{user.firstName} </span>
                    <span>{user.lastName} </span>
                    <span>{user.email} </span>
                    <span>{user.staff}</span>
                  </article>)
              })
              : null
            }
              </main>
              </div>
      </div>
    )
  }
}

export default connect(state => state)(UserAccess)