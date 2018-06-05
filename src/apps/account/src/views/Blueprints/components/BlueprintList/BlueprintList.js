import { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBlueprints } from '../../../../../../properties/src/store/blueprints'

import styles from './BlueprintList.less'

class Blueprints extends Component {
  componentDidMount() {
    this.props.dispatch(fetchBlueprints())
  }
  render() {
    return (
      <section className={styles.Blueprints}>
        <section className={styles.BlueprintList}>
          <WithLoader
            condition={this.props.blueprints.length}
            message="Loading Your Custom Blueprints">
            {this.props.blueprints.map(blueprint => {
              return (
                <Card key={blueprint.ZUID}>
                  <CardHeader>
                    <h1>{blueprint.name}</h1>
                  </CardHeader>
                  <CardContent className={styles.Blueprint}>
                    {blueprint.coverImage ? (
                      <img
                        width="300px"
                        height="150px"
                        src={blueprint.coverImage}
                        alt="Blueprint is missing an image"
                      />
                    ) : (
                      <div className={styles.noimage} aria-hidden="true">
                        <i className="fa fa-file-code-o" aria-hidden="true" />
                      </div>
                    )}
                    <p>{blueprint.shortDescription}</p>
                  </CardContent>
                  <CardFooter className={styles.BlueprintAction}>
                    <Url href={blueprint.githubURL} target="_blank">
                      <i className="fa fa-github" aria-hidden="true" />
                      View On GitHub
                    </Url>
                    <AppLink to={`/settings/blueprints/${blueprint.ID}`}>
                      <i className="fa fa-pencil-square-o" aria-hidden="true" />&nbsp;Edit
                    </AppLink>
                  </CardFooter>
                </Card>
              )
            })}
          </WithLoader>
        </section>
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
