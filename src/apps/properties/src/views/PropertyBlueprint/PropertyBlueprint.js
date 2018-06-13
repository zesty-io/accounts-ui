import { Component } from 'React'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import styles from './PropertyBlueprint.less'

import qs from 'qs'
import { updateSite, fetchSite, updateSiteBlueprint } from '../../store/sites'
import { notify } from '../../../../../shell/store/notifications'
import { fetchBlueprints } from '../../store/blueprints'

class PropertyBlueprint extends Component {
  state = {
    submitted: false
  }
  componentDidMount() {
    this.props.dispatch(fetchBlueprints())
  }
  render() {
    return (
      <div className={styles.BlueprintView}>
        <WithLoader
          condition={this.props.blueprints.length}
          message="Loading Available Blueprints"
        >
          <section>
            <header>
              <h1>Select a Blueprint</h1>
              <AppLink type="cancel" to={`/instances`}>
                <i className="fa fa-ban" aria-hidden="true" />&nbsp;Cancel
              </AppLink>
            </header>
            <p className={styles.description}>
              Blueprints are the starting point of your new website. They can
              come pre-built with CSS, HTML, JavaScript, Pages, and Datasets.
              You can find a selection of common community design frameworks
              configured for Zesty.io.
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
                          <i className="fa fa-file-code-o" aria-hidden="true" />
                        </div>
                      ) : (
                        <img
                          src={blueprint.coverImage}
                          alt="Blueprint cover image"
                        />
                      )}
                      <p>{blueprint.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        disabled={this.state.submitted}
                        onClick={() => this.setInstanceBlueprint(blueprint.ID)}
                      >
                        <i className="fa fa-file-code-o" aria-hidden="true" />
                        Select Blueprint
                      </Button>
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
        this.props.history.push(`/instances/${this.props.siteZUID}`)
        window.open(
          `${CONFIG.MANAGER_URL_PROTOCOL}${this.props.randomHashID}${
            CONFIG.MANAGER_URL
          }`,
          '_blank'
        )
      })
      .catch(err => {
        console.error(err)
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

export default withRouter(
  connect((state, ownProps) => {
    const blueprints = Object.keys(state.blueprints)
      .reduce((acc, key) => {
        acc.push(state.blueprints[key])
        return acc
      }, [])
      .filter(blueprint => !blueprint.trashed)

    const siteZUID = ownProps.match.params.zuid
    const randomHashID = state.sites[siteZUID].randomHashID

    return {
      siteZUID,
      randomHashID,
      blueprints
    }
  })(PropertyBlueprint)
)
