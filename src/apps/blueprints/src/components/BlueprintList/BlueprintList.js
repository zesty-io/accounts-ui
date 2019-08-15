import React from 'react'
import BlueprintCard from '../BlueprintCard'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { AppLink } from '@zesty-io/core/AppLink'
import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Url } from '@zesty-io/core/Url'

import styles from './BlueprintList.less'
import { Button } from '@zesty-io/core/Button'
export default function BlueprintList(props) {
  return (
    <section className={styles.Blueprints}>
      <section className={styles.BlueprintList}>
        <Card className={styles.Create}>
          <CardHeader className={styles.CardHeader}>
            <h3>What are Blueprints?</h3>
          </CardHeader>
          <CardContent className={styles.CardContent}>
            <p>
              Blueprints are a set of instructions for how to create an
              instance. By creating and registering a blueprint you can have a
              consistent starting point of structure(schema) and code for every
              new instance you create.
            </p>

            <p>
              Once registered when you create a new instance you will be able to
              select your custom blueprint.
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
            <Button kind="save">
              <AppLink to="/blueprints/create" id="createBlueprint">
                <i className="fa fa-plus" aria-hidden="true" />
                &nbsp;Register a Blueprint
              </AppLink>
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
