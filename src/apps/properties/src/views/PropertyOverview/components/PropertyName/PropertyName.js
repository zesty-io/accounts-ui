import { Component } from 'react'
import styles from './PropertyName.less'
import { updateSite } from '../../../../store/sites'

export default class PropertyName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editName: false,
      name: this.props.name
    }
  }
  render() {
    return (
      <div className={styles.propertyName}>
        {this.state.editName ? (
          <React.Fragment>
            <Input
              value={this.state.name}
              onChange={evt => {
                this.setState({
                  name: evt.target.value
                })
              }}
            />
            <i onClick={this.handleNameUpdate} className="fa fa-save" />
          </React.Fragment>
        ) : (
          this.props.name
        )}
        <i
          className={
            this.state.editName ? 'fa fa-times-circle' : 'fa fa-pencil'
          }
          aria-hidden="true"
          onClick={this.editName}
        />
      </div>
    )
  }
  editName = () => {
    this.setState({
      editName: !this.state.editName
    })
  }
  handleNameUpdate = () => {
    this.props
      .dispatch(
        updateSite(this.props.ZUID, {
          name: this.state.name
        })
      )
      .then(data => {
        this.props.dispatch(fetchSite(this.props.ZUID))
        this.props.dispatch(
          notify({
            message: 'Successfully Updated',
            type: 'success'
          })
        )
        return this.setState({ editName: !this.state.editName })
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            message: 'Error Updating',
            type: 'error'
          })
        )
        return this.setState({ editName: !this.state.editName })
      })
  }
}
