import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { acceptInvite, deleteInvite } from '../../store/sites'
import { notify } from '../../../../../shell/store/notifications'

import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Button } from '@zesty-io/core/Button'

import styles from './PropertyAccept.less'
class PropertyAcceptInvite extends Component {
  constructor(props) {
    super()
    this.state = {
      submitted: false
    }
  }
  componentDidMount() {
    //fetch site from invite
    console.log(this.props.invited)
  }
  render() {
    return (
      <section className={styles.PropertyAccept}>
        <h2>Welcome to Zesty.io</h2>
        <h1>Accept the invite to get started</h1>
        <h1>{this.props.invited}</h1>
        <div className={styles.controls}>
          <ButtonGroup>
            <Button className={styles.invite} onClick={this.handleAccept}>
              <i className="fa fa-check-circle-o" aria-hidden="true" />
              Accept Invite
            </Button>
            <Button kind="cancel" onClick={this.handleDecline}>
              <i className="fa fa-ban" aria-hidden="true" />
              Decline
            </Button>
          </ButtonGroup>
        </div>
      </section>
    )
  }
  handleChange = evt => {
    this.setState({ name: evt.target.value })
  }
  handleAccept = () => {
    this.setState({ submitted: !this.state.submitted })
    this.props
      .dispatch(acceptInvite(this.props.invited))
      .then(data => {
        this.setState({ submitted: !this.state.submitted })
        this.props.dispatch({
          type: 'REMOVE_MODAL'
        })
        this.props.history.push(`/instances/${data.data.ZUID}/`)
      })
      .catch(err => {
        this.setState({ submitted: !this.state.submitted })
        this.props.dispatch(
          notify({
            message: `Problem accepting invite`,
            type: 'error'
          })
        )
      })
  }
  handleDecline = () => {
    this.setState({ submitted: !this.state.submitted })
    this.props
      .dispatch(deleteInvite(this.state.name))
      .then(data => {
        this.setState({ submitted: !this.state.submitted })
        this.props.dispatch({
          type: 'REMOVE_MODAL'
        })
        this.props.history.push(`/instances`)
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
  return state.user
}

export default withRouter(connect(mapStateToProps)(PropertyAcceptInvite))
