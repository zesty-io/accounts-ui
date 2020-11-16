import { PureComponent } from 'react'
import styles from './Blueprint.less'

import { zConfirm } from '../../../../../../../shell/store/confirm'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

export default class Blueprint extends PureComponent {
  render() {
    return (
      <React.Fragment>
        {!this.props.loadingBlueprint ? (
          <Card className={styles.Blueprint}>
            <CardHeader>
              <h2>
                <i className="fas fa-file-code" aria-hidden="true" />
                &nbsp;Blueprint
              </h2>
              {this.props.isAdmin ? (
                <Button
                  className={styles.Button}
                  kind="cancel"
                  id="changeBlueprint"
                  onClick={this.handleChangeBlueprint}>
                  <i className="fas fa-file-code" aria-hidden="true" />
                  &nbsp;Change Blueprint
                </Button>
              ) : null}
            </CardHeader>
            <CardContent>
              {this.props.blueprint.coverImage ? (
                <img src={this.props.blueprint.coverImage} alt="" />
              ) : this.props.blueprint.mainImage ? (
                <img src={this.props.blueprint.mainImage} alt="" />
              ) : (
                <p>No cover image set for this blueprint</p>
              )}
              <h2 className={styles.name} id="blueprintName">
                {this.props.blueprint.name}
              </h2>
              <p>{this.props.blueprint.description}</p>

              {/* {this.props.blueprint.githubURL ? (
                <Url href={this.props.blueprint.githubURL} target="_blank">
                  <i className="fab fa-github" aria-hidden="true" />
                  View On GitHub
                </Url>
              ) : null} */}
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
        kind: 'warn',
        prompt: `Are you sure you want to change the blueprint?
          This will DELETE all of your content, code, and schema.`,
        callback: response => {
          if (response) {
            this.props.history.push(`${this.props.match.url}/blueprint`)
          }
        }
      })
    )
  }
}
