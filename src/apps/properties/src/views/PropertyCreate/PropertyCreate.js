import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { createInstance } from '../../store/sites'
import { notify } from '../../../../../shell/store/notifications'
import { fetchEcosystems } from '../../../../../shell/store/ecosystems'

import { Input } from '@zesty-io/core/Input'
import { Button } from '@zesty-io/core/Button'
import { Infotip } from '@zesty-io/core/Infotip'
import { DropDownFieldType } from '@zesty-io/core/DropDownFieldType'

import styles from './PropertyCreate.less'
export default connect(state => {
  return {
    ecosystems: state.ecosystems
  }
})(
  class PropertyCreate extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        submitted: false,
        ecoZUID: '',
        name: ''
      }
    }

    componentDidMount() {
      this.props.dispatch(fetchEcosystems())
    }

    render() {
      return (
        <section className={styles.PropertyCreate}>
          <div className={styles.nameNew}>
            <h1>Name your new instance</h1>
            <Input
              type="text"
              name="propertyName"
              placeholder="e.g. Internal API, Marketing Website, etc"
              onChange={this.handleChange}
            />

            {this.props.ecosystems.length ? (
              <React.Fragment>
                <h2>
                  <Infotip>
                    By adding an instance to an EcoSystem you allow sharing
                    assets between instances within the same EcoSystem.
                  </Infotip>
                  &nbsp;EcoSystem
                </h2>
                <DropDownFieldType
                  className={styles.Ecosystem}
                  name="ecoFilter"
                  onChange={(name, value) => {
                    this.setState({
                      ecoZUID: value
                    })
                  }}
                  // selection={ecosystems.find(eco => eco.id == this.state.eco)}
                  options={this.props.ecosystems.map(eco => {
                    return {
                      value: eco.ZUID,
                      text: eco.name
                    }
                  })}
                />
              </React.Fragment>
            ) : null}

            <div className={styles.controls}>
              <Button
                data-test="createInstance"
                onClick={this.handleClick}
                disabled={this.state.submitted}>
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
      this.setState({
        name: evt.target.value.trim()
      })
    }
    handleClick = () => {
      if (this.state.name) {
        this.setState({ submitted: true })
        this.props
          .dispatch(createInstance(this.state.name, this.state.ecoZUID))
          .then(site => {
            this.setState({ submitted: false })
            this.props.history.push(`/instances/${site.ZUID}/blueprint`)
          })
          .catch(err => {
            this.setState({ submitted: false })
            this.props.dispatch(
              notify({
                message: `Failed creating instance`,
                type: 'error'
              })
            )
          })
      } else {
        this.props.dispatch(
          notify({
            message: 'You must enter a name for your instance',
            type: 'error'
          })
        )
      }
    }
  }
)
