import { Component } from 'React'
import styles from './RoleCreate.less'

export class RoleCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
      name: '',
      systemRoleZUID: '',
      expiry: '',
      selectedRole: {
        value: 'Select Role',
        text: 'Select Role'
      }
    }
  }
  render() {
    return (
      <form className={styles.RoleCreate}>
        <span className={styles.label}>
          <label>Role Name</label>
          <Input
            type="text"
            name="name"
            placeholder="Name this custom role"
            autoComplete="off"
            value={this.state.name}
            onChange={this.onChange}
          />
        </span>
        <span className={styles.base}>
          <label>Base Role</label>
          <Select
            onSelect={this.selectBaseRole}
            selection={this.state.selectedRole}
          >
            {this.props.systemRoles.map(role => {
              return (
                <Option key={role.ZUID} value={role.ZUID} text={role.name} />
              )
            })}
          </Select>
        </span>
        <span className={styles.expires}>
          <label>Exipres(optional)</label>
          <Input type="date" name="expiry" onChange={this.onChange} />
        </span>
        <Button
          className={styles.createButton}
          onClick={this.handleCreate}
          disabled={this.state.submitted}
        >
          {this.state.submitted ? 'Creating Role' : 'Create Role'}
        </Button>
      </form>
    )
  }
  onChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  selectBaseRole = evt => {
    this.setState({
      systemRoleZUID: evt.currentTarget.dataset.value,
      selectedRole: {
        value: evt.currentTarget.dataset.value,
        text: evt.target.innerHTML
      }
    })
  }
  handleCreate = evt => {
    evt.preventDefault()
    if (this.state.name !== '' && this.state.systemRoleZUID !== '') {
      this.setState({ submitted: !this.state.submitted })
      this.props
        .dispatch(createRole(this.props.siteZUID, { ...this.state }))
        .then(data => {
          this.props
            .dispatch(getRole(data.ZUID, this.props.siteZUID))
            .then(data => {
              this.props.dispatch({
                type: 'NEW_MODAL',
                component: EditRole,
                props: {
                  siteZUID: this.props.siteZUID,
                  roleZUID: data.ZUID
                }
              })
              this.setState({ submitted: !this.state.submitted, name: '' })
            })
          return this.props.dispatch(
            fetchSiteRoles(this.props.user.ZUID, this.props.siteZUID)
          )
        })
        .catch(err => {
          console.table(err)
          this.setState({ submitted: !this.state.submitted, name: '' })
        })
    } else {
      this.props.dispatch(
        notify({
          message:
            'You must include a name and system role to create a new role.',
          type: 'error'
        })
      )
    }
  }
}
