import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchBlueprints } from '../../../../../../properties/src/store/blueprints'

import styles from './Blueprint.less'

class Blueprints extends Component {
  componentDidMount() {
    this.props.dispatch(fetchBlueprints())
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.blueprints !== this.props.blueprints) {
      return true
    }
    return false
  }
  render() {
    return (
      <div className={styles.blueprints}>
        <div className={styles.message}>
          <h2 className={styles.title}>Custom Blueprints</h2>
          <p>
            In this area you can manage your own custom Blueprints. Learn how to
            create and maintain your own Blueprints using GitHub through this.
            You may share Blueprints by passing your GitHub repo url to a
            co-worker or friend. You may use other public Blueprints by forking
            their repositories, and copying the Github repository url.
          </p>

          <Button
            onClick={() => (window.location = '/settings/blueprints/create')}>
            <i className="fa fa-plus" aria-hidden="true" />
            Create Blueprint
          </Button>
        </div>
        <div className={styles.BlueprintView}>
          <main className={styles.Blueprints}>
            {Object.keys(this.props.blueprints).length ? (
              Object.keys(this.props.blueprints)
                .filter(i => {
                  if (
                    !this.props.blueprints[i].trashed &&
                    this.props.blueprints[i].createdByUserZUID ===
                      this.props.user.ZUID
                  ) {
                    return i
                  }
                })
                .map(i => {
                  let blueprint = this.props.blueprints[i]
                  return (
                    <article className={styles.Blueprint} key={i}>
                      <header>
                        <h1 className={styles.name}>{blueprint.name}</h1>
                      </header>
                      <main>
                        <img src={blueprint.coverImage} alt="bp img" />
                        <p>{blueprint.description}</p>
                      </main>
                      <footer>
                        <Button
                          onClick={evt => {
                            evt.preventDefault()
                            return this.props.history.push(`/settings/blueprints/${blueprint.ID}`)
                          }}>
                          <i className="fa fa-pencil" aria-hidden="true" />
                          Edit
                        </Button>
                      </footer>
                    </article>
                  )
                })
            ) : (
              <div>
                <h5>Loading your custom blueprints</h5>
                <Loader />
              </div>
            )}
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(state => state)(Blueprints))
