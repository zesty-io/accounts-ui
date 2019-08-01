import { Component } from 'react'
import { connect } from 'react-redux'

import { updateSiteBlueprint } from '../../store/sites'
import { notify } from '../../../../../shell/store/notifications'
import { fetchBlueprints } from '../../store/blueprints'

import { WithLoader } from '@zesty-io/core/WithLoader'
import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { AppLink } from '@zesty-io/core/AppLink'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

import styles from './PropertyBlueprint.less'
class PropertyBlueprint extends Component {
  state = {
    submitted: false
  }
  componentDidMount() {
    this.props.dispatch(fetchBlueprints()).catch(() => {
      this.props.dispatch(
        notify({ message: 'Error fetching blueprints', type: 'error' })
      )
    })
  }
  render() {
    return (
      <div className={styles.BlueprintView}>
        <WithLoader
          condition={this.props.blueprints.length}
          message="Loading Available Blueprints">
          <section>
            <header>
              <h1>Select a Blueprint</h1>
              <AppLink kind="cancel" to={`/instances`}>
                <i className="fa fa-ban" aria-hidden="true" />
                &nbsp;Cancel
              </AppLink>
            </header>
            <p className={styles.description}>
              Blueprints are the starting point of your new content instance.
              They can come pre-built with CSS, HTML, JavaScript, Schemas, and
              content items(e.g. pages, headless data, etc.). Here you will find
              a selection of community design frameworks configured as Zesty.io
              blueprints.
            </p>
            <main className={styles.Blueprints}>
              {this.props.blueprints.map(blueprint => {
                return (
                  <Card key={blueprint.ID} className={styles.Blueprint}>
                    <CardHeader>
                      <h4>{blueprint.name}</h4>
                    </CardHeader>
                    <CardContent className={styles.CardContent}>
                      {blueprint.coverImage === '' ? (
                        <div className={styles.noimage} aria-hidden="true">
                          <i className="fas fa-file-code" aria-hidden="true" />
                        </div>
                      ) : (
                        <img
                          src={blueprint.coverImage}
                          alt="Blueprint cover image"
                        />
                      )}
                      <p>{blueprint.description}</p>
                    </CardContent>
                    <CardFooter className={styles.CardFooter}>
                      <Button
                        disabled={this.state.submitted}
                        onClick={() => this.setInstanceBlueprint(blueprint.ID)}>
                        <i className="fas fa-file-code" aria-hidden="true" />
                        Select Blueprint
                      </Button>
                      {blueprint.previewURL && (
                        <Url href={blueprint.previewURL} target="_blank">
                          <i className="fa fa-eye" aria-hidden="true" />
                          &nbsp;Preview
                        </Url>
                      )}
                    </CardFooter>
                  </Card>
                )
              })}
            </main>
          </section>
        </WithLoader>
      </div>
    )
  }
  setInstanceBlueprint = id => {
    this.setState({
      submitted: true
    })

    this.props
      .dispatch(
        updateSiteBlueprint(this.props.siteZUID, {
          blueprintID: id
        })
      )
      .then(data => {
        if (!this.props.siteBlueprint) {
          window.open(
            `${CONFIG.MANAGER_URL_PROTOCOL}${this.props.randomHashID}${CONFIG.MANAGER_URL}`,
            '_blank'
          )
        }
        this.props.history.push(`/instances/${this.props.siteZUID}`)
      })
      .catch(err => {
        this.setState({
          submitted: false
        })
        this.props.dispatch(
          notify({
            type: 'error',
            message: 'There was a problem selecting the blueprint'
          })
        )
      })
  }
}

export default connect((state, ownProps) => {
  const blueprints = Object.keys(state.blueprints)
    .reduce((acc, key) => {
      acc.push(state.blueprints[key])
      return acc
    }, [])
    .filter(blueprint => !blueprint.trashed)

  const siteZUID = ownProps.match.params.zuid
  const randomHashID = state.sites[siteZUID].randomHashID
  const siteBlueprint = state.sites[siteZUID].blueprintID

  return {
    siteZUID,
    randomHashID,
    siteBlueprint,
    blueprints
  }
})(PropertyBlueprint)
