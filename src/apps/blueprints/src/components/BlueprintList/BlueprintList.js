import React from 'react'
import BlueprintCard from '../BlueprintCard'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { AppLink } from '@zesty-io/core/AppLink'
import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Url } from '@zesty-io/core/Url'

import styles from './BlueprintList.less'
export default function BlueprintList(props) {
  return (
    <section className={styles.Blueprints}>
      <section className={styles.BlueprintList}>
        <Card className={styles.Create}>
          <CardHeader className={styles.CardHeader}>
            <h3>Blueprints</h3>
          </CardHeader>
          <CardContent className={styles.CardContent}>
            <p>
              Blueprints are the instructions for how to build an instance. By
              creating a blueprint you can have a consistent schema and code
              starting point for every new instances you create.
            </p>

            <h4>Getting Started</h4>
            <ul>
              <li>
                <Url
                  href="https://zesty.org/services/web-engine/guides/how-to-create-a-blueprint-in-github"
                  target="_blank">
                  Learn how to create a blueprint
                </Url>
              </li>
              <li>
                <Url href="https://github.com/zesty-io?q=plate" target="_blank">
                  Fork an existing blueprint
                </Url>
              </li>
            </ul>
          </CardContent>
          <CardFooter className={styles.CardFooter}>
            <AppLink to="/blueprints/create" id="createBlueprint">
              <i className="fa fa-plus" aria-hidden="true" />
              &nbsp;Register Your Blueprint
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
