import { Component } from 'react'

import styles from './BlueprintList.less'
import BlueprintCard from '../BlueprintCard'

class BlueprintList extends Component {
  render() {
    return (
      <WithLoader
        className={styles.Loading}
        condition={!this.props.loadingBlueprints}
        message="Loading Your Custom Blueprints">
        <section className={styles.Blueprints}>
          <section className={styles.BlueprintList}>
            <Card className={styles.Create}>
              <CardHeader>
                <h1>Custom Blueprints</h1>
              </CardHeader>
              <p>
                In this area you can manage your own custom Blueprints. Learn
                how to create and maintain your own Blueprints using GitHub
                through this. You may share Blueprints by passing your GitHub
                repo url to a co-worker or friend. You may use other public
                Blueprints by forking their repositories, and copying the GitHub
                repository url.
              </p>
              <CardFooter>
                <AppLink to="/blueprints/create">
                  <i className="fa fa-plus" aria-hidden="true" />
                  &nbsp;Create Blueprint
                </AppLink>
              </CardFooter>
            </Card>
            {this.props.userBlueprints.map(blueprint => (
              <BlueprintCard
                key={blueprint.ZUID}
                handleDelete={this.props.handleDelete}
                blueprint={blueprint}
              />
            ))}
          </section>
        </section>
      </WithLoader>
    )
  }
}

export default BlueprintList
