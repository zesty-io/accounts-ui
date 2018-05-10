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
        <div className={styles.BlueprintView}>
          <main className={styles.Blueprints}>
            <article className={styles.Blueprint}>
              <header>
                <h1 className={styles.name}>Custom Blueprints</h1>
              </header>
              <main>
                <p>
                  In this area you can manage your own custom Blueprints. Learn
                  how to create and maintain your own Blueprints using GitHub
                  through this. You may share Blueprints by passing your GitHub
                  repo url to a co-worker or friend. You may use other public
                  Blueprints by forking their repositories, and copying the
                  Github repository url.
                </p>
              </main>
              <footer>
                <Button
                  onClick={evt => {
                    evt.preventDefault()
                    this.props.history.push('/settings/blueprints/create')
                  }}>
                  <i className="fa fa-plus" aria-hidden="true" />
                  Create Blueprint
                </Button>
              </footer>
            </article>
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
                        {blueprint.coverImage === '' ? (
                          <div className={styles.noimage} aria-hidden="true">
                            <i className="fa fa-paper-plane-o" aria-hidden="true" />
                          </div>
                        ) : (
                          <img src={blueprint.coverImage} alt="bp img broked" />
                        )}
                        <p>{blueprint.shortDescription}</p>
                      </main>
                      <footer>
                        <Button
                          onClick={evt => {
                            evt.preventDefault()
                            return this.props.history.push(
                              `/settings/blueprints/${blueprint.ID}`
                            )
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
                <h5>Loading your custom Blueprints</h5>
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
