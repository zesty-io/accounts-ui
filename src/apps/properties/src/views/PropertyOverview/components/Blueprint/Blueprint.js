import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchBlueprint } from '../../../../store/blueprints'

import styles from './Blueprint.less'
class Blueprint extends Component {
  constructor(props) {
    super(props)
    console.log('Blueprint: ', props)
  }
  componentDidMount() {
    this.props.dispatch(fetchBlueprint(this.props.site.blueprintID))
  }
  render() {
    return (
      <WithLoader
        condition={Object.keys(this.props.blueprint).length}
        message="Loading Blueprint"
      >
        <article className={styles.Blueprint}>
          <header>
            <h1 className={styles.name}>{this.props.blueprint.name}</h1>
          </header>
          <main>
            <img src={this.props.blueprint.coverImage} alt="" />
            <p>{this.props.blueprint.description}</p>
          </main>
          <Button onClick={this.handleSelect}>
            <i className="fa fa-columns" aria-hidden="true" />
            Change Blueprint
          </Button>
          <footer />
        </article>
      </WithLoader>
    )
  }
  handleSelect = evt => {
    evt.preventDefault()
    this.props.history.push(`${this.props.site.ZUID}/blueprint`)
  }
}

export default withRouter(
  connect((state, ownProps) => {
    const site = state.sites[ownProps.match.params.hash]
    return {
      site: site,
      blueprint: state.blueprints[site.blueprintID] || {}
    }
  })(Blueprint)
)
