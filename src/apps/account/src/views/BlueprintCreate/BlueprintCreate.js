import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { postNewBlueprint } from '../../../../properties/src/store/blueprints'

import styles from './BlueprintCreate.less'

class BlueprintCreate extends Component {
  constructor(props) {
    super()
    this.state = {
      submitted: false,
      name: ''
    }
  }
  render() {
    return (
      <section className={styles.BlueprintCreate}>
        <div className={styles.nameNew}>
          <h1>Name your new Blueprint</h1>
          <Input
            type="text"
            name="createBlueprintName"
            placeholder="e.g. Acme Corp. Default Blueprint"
            onChange={this.handleChange}
          />
          <div className={styles.controls}>
            <Button onClick={this.handleClick} disabled={this.state.submitted}>
              <i className="fa fa-plus" aria-hidden="true" />
              Create New Blueprint
            </Button>
            <Link to="/settings/account">
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
    this.setState({ submitted: !this.state.submitted })
    this.props.dispatch(postNewBlueprint(this.state.name)).then(bp => {
      this.setState({ submitted: !this.state.submitted })
      return this.props.history.push(`../blueprints/${bp.ID}`)
    })
  }
}

export default withRouter(connect(state => state)(BlueprintCreate))
