import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'

import { createInstance } from '../../store/sites'
import { notify } from '../../../../../shell/store/notifications'

import styles from './PropertyCreate.less'

class PropertyCreate extends Component {
  constructor(props) {
    super(props)

    console.log('props: ', props)

    this.state = {
      submitted: false,
      name: ''
    }
  }
  render() {
    return (
      <section className={styles.PropertyCreate}>
        <div className={styles.nameNew}>
          <h1>Name your new instance</h1>
          <Input
            type="text"
            name="propertyName"
            placeholder="e.g. Acme Corp. Marketing Website"
            onChange={this.handleChange}
          />
          <div className={styles.controls}>
            <Button onClick={this.handleClick} disabled={this.state.submitted}>
              <i className="fa fa-plus" aria-hidden="true" />
              {this.state.submitted
                ? 'Creating Your Instance'
                : 'Create New Instance'}
            </Button>
            <Link to="/instances">
              <i className="fa fa-ban" aria-hidden="true" />
              &nbsp;Cancel
            </Link>
          </div>
        </div>
      </section>
    )
  }
  handleChange = evt => {
    this.setState({ name: evt.target.value })
  }
  handleClick = () => {
    if (this.state.name === '') {
      return this.props.dispatch(
        notify({
          message: 'You must enter a name for your instance',
          type: 'error'
        })
      )
    }
    this.setState({ submitted: !this.state.submitted })
    this.props
      .dispatch(createInstance(this.state.name))
      .then(data => {
        this.setState({ submitted: !this.state.submitted })
        this.props.history.push(`/instances/${data.data.ZUID}/blueprint`)
      })
      .catch(err => {
        this.setState({ submitted: !this.state.submitted })
        this.props.dispatch(
          notify({
            message: `Problem creating site: ${err}`,
            type: 'error'
          })
        )
      })
  }
}

const mapStateToProps = state => {
  return {
    ...state.createSite
  }
}

export default withRouter(connect(mapStateToProps)(PropertyCreate))
