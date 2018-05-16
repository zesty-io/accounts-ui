import { Component } from 'React'
import styles from './RoleCreate.less'

export class RoleCreate extends Component {
  constructor(props) {
    super(props)
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
          <Input type="date" name="expiry" onChange={this.setExpiry} />
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
