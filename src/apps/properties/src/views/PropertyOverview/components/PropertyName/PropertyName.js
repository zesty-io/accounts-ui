import { Component } from 'react'
import cx from 'classnames'
import styles from './PropertyName.less'

import { notify } from '../../../../../../../shell/store/notifications'
import { updateSite } from '../../../../store/sites'

export default class PropertyName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editName: false,
      name: this.props.name || ''
    }
  }
  render() {
    return (
      <div className={styles.PropertyName}>
        {this.state.editName ? (
          <div className={styles.EditName}>
            <Input
              value={this.state.name}
              onChange={evt => {
                this.setState({
                  name: evt.target.value
                })
              }}
            />
            <i onClick={this.handleNameUpdate} className="fa fa-save" />
          </div>
        ) : (
          <h1 className={styles.Name} onClick={this.editName}>
            {this.props.name}
            <i className={cx('fa fa-pencil', styles.Edit)} aria-hidden="true" />
          </h1>
        )}
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
        updateSite(this.props.siteZUID, {
          name: this.state.name
        })
      )
      .then(res => {
        this.props.dispatch({
          type: 'FETCH_SITE_SUCCESS',
          site: res.data
        })
        this.props.dispatch(
          notify({
            message: 'Name Successfully Updated',
            type: 'success'
          })
        )
        return this.setState({
          editName: false
        })
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            message: 'Error Updating Name',
            type: 'error'
          })
        )
        return this.setState({
          editName: false
        })
      })
  }
}
