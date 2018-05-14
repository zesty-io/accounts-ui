import { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBlueprints } from '../../../../../../properties/src/store/blueprints'

import styles from './Blueprint.less'

class Blueprints extends Component {
  componentDidMount() {
    this.props.dispatch(fetchBlueprints())
  }
  render() {
    return (
      <section className={styles.Blueprints}>
        <header className={styles.Create}>
          <h1 className={styles.name}>Custom Blueprints</h1>
          <p>
            In this area you can manage your own custom Blueprints. Learn how to
            create and maintain your own Blueprints using GitHub through this.
            You may share Blueprints by passing your GitHub repo url to a
            co-worker or friend. You may use other public Blueprints by forking
            their repositories, and copying the Github repository url.
          </p>
          <AppLink to="/settings/blueprints/create">
            <i className="fa fa-plus" aria-hidden="true" />
            &nbsp;Create Blueprint
          </AppLink>
        </header>
        <main className={styles.BlueprintList}>
          <WithLoader condition={this.props.blueprints.length}>
            {this.props.blueprints.map(blueprint => {
              return (
                <article className={styles.Blueprint} key={blueprint.ZUID}>
                  <header>
                    <h1 className={styles.name}>{blueprint.name}</h1>
                  </header>
                  <main>
                    {blueprint.coverImage ? (
                      <img
                        src={blueprint.coverImage}
                        alt="Blueprint is missing an image"
                      />
                    ) : (
                      <div className={styles.noimage} aria-hidden="true">
                        <i className="fa fa-pied-piper" aria-hidden="true" />
                      </div>
                    )}
                    <p>{blueprint.shortDescription}</p>
                  </main>
                  <footer>
                    <AppLink to={`/settings/blueprints/${blueprint.ID}`}>
                      Edit
                    </AppLink>
                  </footer>
                </article>
              )
            })}
          </WithLoader>
        </main>
      </section>
    )
  }
}

export default connect(state => {
  let blueprints = Object.keys(state.blueprints)
    .filter(id => {
      let blueprint = state.blueprints[id]
      if (
        !blueprint.trashed &&
        blueprint.createdByUserZUID === state.user.ZUID
      ) {
        return true
      }
    })
    .map(id => state.blueprints[id])

  return { blueprints }
})(Blueprints)
