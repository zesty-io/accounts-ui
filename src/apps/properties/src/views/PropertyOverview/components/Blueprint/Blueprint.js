import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from './Blueprint.less'

class Blueprint extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <React.Fragment>
        <Divider />
        {!this.props.loadingBlueprint ? (
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
        ) : (
          <Loader />
        )}
      </React.Fragment>
    )
  }
  handleSelect = evt => {
    evt.preventDefault()
    this.props.history.push(`${this.props.siteZUID}/blueprint`)
  }
}

export default withRouter(Blueprint)
