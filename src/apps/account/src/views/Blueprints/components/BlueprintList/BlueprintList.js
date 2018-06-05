import { Component } from 'react'

import styles from './BlueprintList.less'

class BlueprintList extends Component {
  render() {
    return (
      <section className={styles.Blueprints}>
        <section className={styles.BlueprintList}>
          <WithLoader
            condition={this.props.userBlueprints.length}
            message="Loading Your Custom Blueprints">
            {this.props.userBlueprints.map(blueprint => {
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

export default BlueprintList
