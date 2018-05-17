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
            <Button
              type="warn"
              onClick={evt => handleChangeBlueprint(evt)}>
              <i className="fa fa-columns" aria-hidden="true" />
              &nbsp;Change Blueprint
            </Button>
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
  const handleChangeBlueprint = evt => {
    console.log(evt)
  }
}
