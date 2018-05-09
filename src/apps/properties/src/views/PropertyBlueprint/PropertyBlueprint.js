import { Component } from 'React'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import styles from './PropertyBlueprint.less'

import qs from 'qs'
import config from '../../../../../shell/config'
import { updateSite, fetchSite } from '../../store/sites'
import { fetchBlueprints } from '../../store/blueprints'

class PropertyBlueprint extends Component {
  componentWillMount() {
    this.props.dispatch(fetchBlueprints())
  }
  handleSelect = id => {
    this.props
      .dispatch(updateSite(this.props.siteZUID, { blueprintID: id }))
      .then(data => {
        if (qs.parse(window.location.search.substr(1)).randomHashID) {
          window
            .open(
              `${config.MANAGER_URL_PROTOCOL}${
                qs.parse(window.location.search.substr(1)).randomHashID
              }${config.MANAGER_URL}`,
              '_blank'
            )
            .focus()
        } else {
          // re-fetch sites before the redirect
          this.props.dispatch(fetchSite(data.data.ZUID)).then(date => {
            return this.props.history.push(`/properties/${data.data.ZUID}`)
          })
        }
      })
  }
  render() {
    return (
      <React.Fragment>
        {Object.keys(this.props.blueprints).length ? (
          <section className={styles.BlueprintView}>
            <header>
              <h1>Select a Blueprint</h1>
              <a href="/properties">
                <i className="fa fa-ban" aria-hidden="true" />&nbsp;Cancel
                {/* <Button name="cancel" text="cancel" /> */}
              </a>
            </header>
            <p className={styles.description}>
              Blueprints are the starting point of your new website. They can
              come pre-built with CSS, HTML, JavaScript, Pages, and Datasets.
              You can find a selection of common community design frameworks
              configured for Zesty.io.
            </p>
            <span className={styles.Blueprints}>
              {Object.keys(this.props.blueprints)
                .filter(i => !this.props.blueprints[i].trashed)
                .map(i => {
                  let blueprint = this.props.blueprints[i]
                  return (
                    <article className={styles.Blueprint} key={i}>
                      <header>
                        <h1 className={styles.name}>{blueprint.name}</h1>
                      </header>
                      <main>
                        {blueprint.coverImage === '' ? (
                          <div className={styles.noimage} aria-hidden="true">
                            <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                          </div>
                        ) : (
                          <img src={blueprint.coverImage} alt="bp img broked" />
                        )}
                        <p>{blueprint.description}</p>
                      </main>
                      <footer>
                        <Button onClick={() => this.handleSelect(blueprint.ID)}>
                          <i className="fa fa-columns" aria-hidden="true" />
                          Select Blueprint
                        </Button>
                      </footer>
                    </article>
                  )
                })}
            </span>
          </section>
        ) : (
          <div className={styles.Loading}>
            <h2>Loading Blueprints</h2>
            <Loader />
          </div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    siteZUID: ownProps.match.params.zuid,
    blueprints: state.blueprints,
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(PropertyBlueprint))
