import React from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@zesty-io/core/Card'
import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Url } from '@zesty-io/core/Url'
import { AppLink } from '@zesty-io/core/AppLink'

import styles from './BlueprintCard.less'
const BlueprintCard = props => {
  const { blueprint } = props
  return (
    <Card className={styles.BlueprintCard}>
      <CardHeader className={styles.CardHeader}>
        <h3>{blueprint.name}</h3>
      </CardHeader>
      <CardContent className={styles.CardContent}>
        {blueprint.coverImage ? (
          <img src={blueprint.coverImage} alt="Broken cover image" />
        ) : (
          <div className={styles.noimage} aria-hidden="true">
            <i className="fa fa-file-code-o fa-3x" aria-hidden="true" />
            <span>Missing cover image</span>
          </div>
        )}
        <p>{blueprint.shortDescription}</p>
      </CardContent>
      <CardFooter className={styles.CardFooter}>
        <ButtonGroup className={styles.controls}>
          <Url onClick={() => props.handleDelete(blueprint.ID)}>
            <i className={`${styles.trash} fa fa-trash-o`} />
          </Url>
          <Url href={blueprint.githubURL} target="_blank">
            <i className="fa fa-github" aria-hidden="true" />
          </Url>
          {blueprint.previewURL ? (
            <Url
              target="_blank"
              title={`Preview blueprint: ${blueprint.name}`}
              href={blueprint.previewURL}>
              <i className={'fa fa-eye'} aria-hidden="true" />
            </Url>
          ) : (
            <span />
          )}

          <AppLink to={`/blueprints/${blueprint.ID}`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />&nbsp;Edit
          </AppLink>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default BlueprintCard
