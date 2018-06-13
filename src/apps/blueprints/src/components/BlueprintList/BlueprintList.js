import React from 'react'

import styles from './BlueprintList.less'
import BlueprintCard from '../BlueprintCard'

const BlueprintList = props => {
  return (
    <section className={styles.Blueprints}>
      <section className={styles.BlueprintList}>
        <Card className={styles.Create}>
          <CardHeader>
            <h1>Custom Blueprints</h1>
          </CardHeader>
          <p>
            In this area you can manage your own custom Blueprints. Learn how to
            create and maintain your own Blueprints using GitHub through this.
            You may share Blueprints by passing your GitHub repo url to a
            co-worker or friend. You may use other public Blueprints by forking
            their repositories, and copying the GitHub repository url.
          </p>
          <CardFooter>
            <AppLink to="/blueprints/create">
              <i className="fa fa-plus" aria-hidden="true" />
              &nbsp;Create Blueprint
            </AppLink>
          </CardFooter>
        </Card>
        {props.userBlueprints.map(blueprint => (
          <BlueprintCard
            key={blueprint.ZUID}
            handleDelete={props.handleDelete}
            blueprint={blueprint}
          />
        ))}
      </section>
    </section>
  )
}

export default BlueprintList
