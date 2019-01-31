import { Component } from 'react'
import { connect } from 'react-redux'
import { notify } from '../../../../../../../../../shell/store/notifications'
import { createRole, getRole } from '../../../../../../store/sitesRoles'

import styles from './RoleCreate.less'

const today = () => {
  const newDate = new Date()
  return `${newDate.getFullYear()}-${
    newDate.getMonth().length > 1
      ? newDate.getMonth()
      : '0' + (newDate.getMonth() + 1)
  }-${newDate.getDate() + 1}`
}

class RoleCreate extends Component {
  constructor(props) {
    super(props)

    console.log('RoleCreate', props)

    this.state = {
      submitted: false,
      name: '',
      systemRoleZUID: '',
      expiry: ''
    }
  }
  render() {
    return (
      <form className={styles.RoleCreate}>
        <label className={styles.Name}>
          Role Name
          <Input
            type="text"
            name="name"
            placeholder="Name this custom role"
            autoComplete="off"
            value={this.state.name}
            onChange={this.setName}
          />
        </label>

        <label className={styles.Base}>
          Base Role
          <Select onSelect={this.selectBaseRole}>
            <Option key="default" value="" text="Select Role" />
            {this.props.systemRoles.map(role => {
              return (
                <Option key={role.ZUID} value={role.ZUID} text={role.name} />
              )
            })}
          </Select>
        </label>

        <label className={styles.Expiry}>
          Exipres(optional)
          <Input
            type="date"
            min={today()}
            name="expiry"
            onChange={this.setExpiry}
          />
        </label>

        {/* <span className={styles.label} />
        <span className={styles.base} />
        <span className={styles.expires} /> */}

        <Button onClick={this.handleCreate} disabled={this.state.submitted}>
          {this.state.submitted ? 'Creating Role' : 'Create Role'}
        </Button>
      </form>
    )
  }
  setName = evt => {
    this.setState({
      name: evt.target.value
    })
  }
  setExpiry = evt => {
    this.setState({
      expiry: evt.target.value
    })
  }
  selectBaseRole = evt => {
    this.setState({
      systemRoleZUID: evt.currentTarget.dataset.value
    })
  }
  handleCreate = evt => {
    evt.preventDefault()
    if (this.state.name && this.state.systemRoleZUID) {
      this.setState({
        submitted: true
      })

      this.props
        .dispatch(createRole(this.props.siteZUID, { ...this.state }))
        .then(data => {
          // We just created a new role so load the role
          // permissions editing view
          this.props.history.push(`${this.props.match.url}/role/${role.ZUID}`)
          this.setState({ submitted: !this.state.submitted, name: '' })
        })
        .catch(err => {
          this.setState({
            submitted: !this.state.submitted,
            name: ''
          })
          this.props.dispatch(
            notify({ message: 'Error creating roles', type: 'error' })
          )
        })
    } else {
      this.props.dispatch(
        notify({
          message:
            'You must include a name and select a role to create a new custom role.',
          type: 'error'
        })
      )
    }
  }
}

export default connect(state => {
  return {}
})(RoleCreate)
