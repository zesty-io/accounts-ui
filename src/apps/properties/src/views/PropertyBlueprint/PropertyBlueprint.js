import { Component } from 'React'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './PropertyBlueprint.less'

import { getBlueprints } from '../../store'

class PropertyBlueprint extends Component {
  componentWillMount() {
    this.props.dispatch(getBlueprints())
  }
  render() {
    return (
      <div>
        {Object.keys(this.props.blueprints).length ? (
          <section className={styles.PropertyBlueprint}>
            <Link to="/properties">
              {' '}
              <Button name="cancel" text="cancel" />{' '}
            </Link>
            {Object.keys(this.props.blueprints).map(i => {
              let blueprint = this.props.blueprints[i]
              console.log(blueprint, i)

              return (
                <article key={i}>
                  <header>
                    <h1 className={styles.name}>{blueprint.name}</h1>
                  </header>
                  <main>
                    <p>{blueprint.description}</p>
                    <img src={blueprint.url} alt="bp img" />
                    <Button
                      name={`selectBlueprint${i}`}
                      text="select this blueprint"
                    />
                  </main>
                </article>
              )
            })}
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
}
export default connect(state => {
  console.log(state.blueprints)

  return { blueprints: state.blueprints }
})(PropertyBlueprint)
