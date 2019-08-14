import React from 'react'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Button } from '@zesty-io/core/Button'
import { AppLink } from '@zesty-io/core/AppLink'
import { Url } from '@zesty-io/core/Url'

import styles from './BlueprintCard.less'
export default function BlueprintCard(props) {
  return (
    <Card className={styles.BlueprintCard}>
      <CardHeader className={styles.CardHeader}>
        <h3>{props.blueprint.name}</h3>
      </CardHeader>
      <CardContent className={styles.CardContent}>
        {props.blueprint.coverImage ? (
          <img
            className={styles.coverimage}
            src={props.blueprint.coverImage}
            alt="If this text is displaying your cover image was not able to be loaded"
          />
        ) : (
          <div className={styles.noimage} aria-hidden="true">
            <h3 className={styles.subheadeline}>
              <i className="fas fa-image" aria-hidden="true" />
              &nbsp;Missing cover image
            </h3>
          </div>
        )}
        <p>{props.blueprint.shortDescription}</p>
      </CardContent>
      <CardFooter className={styles.CardFooter}>
        <ButtonGroup className={styles.controls}>
          <AppLink className="edit" to={`/blueprints/${props.blueprint.ID}`}>
            <i className="fas fa-edit" aria-hidden="true" />
            &nbsp;Edit
          </AppLink>

          {props.blueprint.previewURL && (
            <Url
              target="_blank"
              title={`Preview blueprint: ${props.blueprint.name}`}
              href={props.blueprint.previewURL}>
              <i className={'fas fa-eye'} aria-hidden="true" />
              &nbsp;Preview
            </Url>
          )}

          <Url href={props.blueprint.githubURL} target="_blank">
            <i className="fab fa-github" aria-hidden="true" />
          </Url>
        </ButtonGroup>
        <Button
          kind="cancel"
          onClick={() => props.handleDelete(props.blueprint.ID)}>
          <i className={`${styles.trash} fa fa-trash`} />
        </Button>
      </CardFooter>
    </Card>
  )
}
