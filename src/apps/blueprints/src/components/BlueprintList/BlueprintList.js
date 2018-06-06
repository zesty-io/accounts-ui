import { Component } from 'react'

import styles from './BlueprintList.less'

class BlueprintList extends Component {
  render() {
    return (
      <WithLoader
        className={styles.Loading}
        condition={!this.props.loadingBlueprints}
        message="Loading Your Custom Blueprints">
        <section className={styles.Blueprints}>
          <section className={styles.BlueprintList}>
            {this.props.userBlueprints.length ? null : (
              <Card className={styles.Create}>
                <CardHeader>
                  <h1>Custom Blueprints</h1>
                </CardHeader>
                <p>
                  In this area you can manage your own custom Blueprints. Learn
                  how to create and maintain your own Blueprints using GitHub
                  through this. You may share Blueprints by passing your GitHub
                  repo url to a co-worker or friend. You may use other public
                  Blueprints by forking their repositories, and copying the
                  GitHub repository url.
                </p>
                <CardFooter>
                  <AppLink to="/blueprints/create">
                    <i className="fa fa-plus" aria-hidden="true" />
                    &nbsp;Create Blueprint
                  </AppLink>
                </CardFooter>
              </Card>
            )}
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
                    <AppLink to={`/blueprints/${blueprint.ID}`}>
                      <i className="fa fa-pencil-square-o" aria-hidden="true" />&nbsp;Edit
                    </AppLink>
                  </CardFooter>
                </Card>
              )
            })}
          </section>
        </section>
      </WithLoader>
    )
  }
}

export default BlueprintList
