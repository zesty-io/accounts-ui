import React from 'react'

import styles from './BlueprintList.less'
import BlueprintCard from '../BlueprintCard'

const BlueprintList = props => {
  return (
    <section className={styles.Blueprints}>
      <section className={styles.BlueprintList}>
        <Card className={styles.Create}>
          <CardHeader className={styles.CardHeader}>
            <h3>Create Blueprint</h3>
          </CardHeader>
          <p>
            In this area you can manage your own custom Blueprints. Learn how to
            create and maintain your own Blueprints using GitHub through this.
            You may share Blueprints by passing your GitHub repo url to a
            co-worker or friend. You may use other public Blueprints by forking
            their repositories, and copying the GitHub repository url.
          </p>
          <CardFooter className={styles.CardFooter}>
            <Button
              type="save"
              to="/blueprints/create"
              onClick={() => {
                this.props.history.push('/blueprints/create')
              }}>
              <i className="fa fa-plus" aria-hidden="true" />
              &nbsp;Create Blueprint
            </Button>
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
