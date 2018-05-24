import styles from './Blueprint.less'

export default function Blueprint(props) {
  return (
    <Card className={styles.Blueprint}>
      <CardHeader>
        <h2>
          <i className="fa fa-file-code-o" aria-hidden="true" />
          &nbsp;Blueprint
        </h2>
        {props.isAdmin ? (
          <AppLink type="cancel" to={`${props.match.url}/blueprint`}>
            <i className="fa fa-file-code-o" aria-hidden="true" />
            &nbsp;Change Blueprint
          </AppLink>
        ) : null}
      </CardHeader>
      <CardContent>
        <WithLoader
          condition={!props.loadingBlueprint}
          message="Loading Instance Blueprint"
          height="100px"
          width="100%"
        >
          <h2 className={styles.name}>{props.blueprint.name}</h2>
          {props.blueprint.coverImage ? (
            <img src={props.blueprint.coverImage} alt="" />
          ) : props.blueprint.mainImage ? (
            <img src={props.blueprint.mainImage} alt="" />
          ) : (
            <p>No cover image set for this blueprint</p>
          )}
          <p>{props.blueprint.description}</p>
          {props.blueprint.githubURL ? (
            <Url href={props.blueprint.githubURL} target="_blank">
              <i className="fa fa-github" aria-hidden="true" />
              View On Github
            </Url>
          ) : null}
        </WithLoader>
      </CardContent>
    </Card>
  )
  const handleChangeBlueprint = evt => {
    console.log(evt)
  }
}
