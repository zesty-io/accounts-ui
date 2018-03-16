import { Component } from 'React'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './PropertyBlueprint.less'

import { fetchBlueprints } from '../../store/blueprints'

class PropertyBlueprint extends Component {
  componentWillMount() {
    this.props.dispatch(fetchBlueprints(this.props.user.zuid))
  }
  render() {
    return (
      <div>
        {Object.keys(this.props.blueprints).length ? (
          <section className={styles.BlueprintView}>
            <header>
              <h1>Select a Blueprint</h1>
              <Url href="/properties">
                <i className="fa fa-ban" aria-hidden="true" />&nbsp;Cancel
                {/* <Button name="cancel" text="cancel" /> */}
              </Url>
            </header>
            <p className={styles.description}>
              Blueprints are the starting point of your new website. They can
              come pre-built with CSS, HTML, JavaScript, Pages, and Datasets.
              You can find a selection of common community design frameworks
              configured for Zesty.io.
            </p>
            <main className={styles.Blueprints}>
              {Object.keys(this.props.blueprints).map(i => {
                let blueprint = this.props.blueprints[i]
                return (
                  <article className={styles.Blueprint} key={i}>
                    <header>
                      <h1 className={styles.name}>{blueprint.name}</h1>
                    </header>
                    <main>
                      <p>
                        <img src={blueprint.url} alt="bp img" />
                        {blueprint.description}
                      </p>
                    </main>
                    <footer>
                      <Button onClick={this.handleSelect}>
                        <i className="fa fa-columns" aria-hidden="true" />
                        Select Blueprint
                      </Button>
                    </footer>
                  </article>
                )
              })}
            </main>
          </section>
        ) : (
          <div className={styles.Loading}>
            <h2>Loading Blueprints</h2>
            <Loader />
          </div>
        )}
      </div>
    )
  }
  handleSelect = evt => {
    // TODO make api request to set blueprint for site
    // TODO user returned zuid
    window.location = '/properties/8-45a294a-1zg0cg'
  }
}

export default connect(state => {
  console.log(state.blueprints)

  return {
    blueprints: state.blueprints,
    user: state.user
  }
})(PropertyBlueprint)
