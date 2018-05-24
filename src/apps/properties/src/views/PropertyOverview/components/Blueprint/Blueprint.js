import { PureComponent } from 'react'
import styles from './Blueprint.less'

import { zConfirm } from '../../../../../../../shell/store/confirm'

export default class Blueprint extends PureComponent {
  render() {
    return (
      <React.Fragment>
        {!this.props.loadingBlueprint ? (
          <Card className={styles.Blueprint}>
            <CardHeader>
              <h2>
                <i className="fa fa-file-code-o" aria-hidden="true" />
                &nbsp;Blueprint
              </h2>
              {this.props.isAdmin ? (
                <Button className={styles.Button} type="cancel" onClick={this.handleChangeBlueprint}>
                  <i className="fa fa-file-code-o" aria-hidden="true" />
                  &nbsp;Change Blueprint
                </Button>
              ) : null}
            </CardHeader>
            <CardContent>
              <h2 className={styles.name}>{this.props.blueprint.name}</h2>
              <img src={this.props.blueprint.coverImage} alt="" />
              <p>{this.props.blueprint.description}</p>
  
              {this.props.blueprint.githubURL ? (
                <Url href={this.props.blueprint.githubURL} target="_blank">
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
  }
  handleChangeBlueprint = evt => {
    evt.preventDefault()
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to change the blueprint?',
        callback: response => {
          if (response) {
            this.props.history.push(`${this.props.match.url}/blueprint`)
          }
        }
      })
    )
  }
}
