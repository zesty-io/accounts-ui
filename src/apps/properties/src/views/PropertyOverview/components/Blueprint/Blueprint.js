import styles from './Blueprint.less'

export default function Blueprint(props) {
  return (
    <React.Fragment>
      {!props.loadingBlueprint ? (
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
            <h2 className={styles.name}>{props.blueprint.name}</h2>
            <img src={props.blueprint.coverImage} alt="" />
            <p>{props.blueprint.description}</p>

            {props.blueprint.githubURL ? (
              <Url href={props.blueprint.githubURL} target="_blank">
                <i className="fa fa-github" aria-hidden="true" />
                View On Github
              </Url>
            ) : null}
          </CardContent>
        </Card>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  )
  const handleChangeBlueprint = evt => {
    console.log(evt)
  }
}
