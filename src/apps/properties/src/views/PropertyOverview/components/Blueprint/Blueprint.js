import styles from './Blueprint.less'

export default function Blueprint(props) {
  return (
    <React.Fragment>
      {!props.loadingBlueprint ? (
        <Card className={styles.Blueprint}>
          <CardHeader>
            <h1>
              <i className="fa fa-file-code-o" aria-hidden="true" />
              &nbsp;Blueprint
            </h1>
            <AppLink to={`${props.siteZUID}/blueprint`}>
              <i className="fa fa-columns" aria-hidden="true" />
              &nbsp;Change Blueprint
            </AppLink>
          </CardHeader>
          <CardContent>
            <h2 className={styles.name}>{props.blueprint.name}</h2>
            <img src={props.blueprint.coverImage} alt="" />
            <p>{props.blueprint.description}</p>
          </CardContent>
        </Card>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  )
}
