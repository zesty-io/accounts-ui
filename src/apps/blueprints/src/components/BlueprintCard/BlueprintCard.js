import React from 'react'

import styles from './BlueprintCard.less'
const BlueprintCard = props => {
  const { blueprint } = props
  return (
    <Card key={blueprint.ZUID}>
      <CardHeader>
        <h3>{blueprint.name}</h3>
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
}

export default BlueprintCard
