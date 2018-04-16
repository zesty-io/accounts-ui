import { Component } from "React";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import styles from "./PropertyBlueprint.less";

import config from "../../../../../shell/config";

import { updateSite } from "../../store/sites";
import { fetchBlueprints } from "../../store/blueprints";

class PropertyBlueprint extends Component {
  componentWillMount() {
    this.props.dispatch(fetchBlueprints());
  }
  handleSelect = id => {
    this.props
      .dispatch(updateSite(this.props.siteZUID, { blueprintID: id }))
      .then(data => {
        return this.props.history.push(`/properties/${this.props.siteZUID}`);
      });
  };
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
              {Object.keys(this.props.blueprints)
                .filter(i => {
                  if (!this.props.blueprints[i].trashed) {
                    return i;
                  }
                })
                .map(i => {
                  let blueprint = this.props.blueprints[i];
                  return (
                    <article className={styles.Blueprint} key={i}>
                      <header>
                        <h1 className={styles.name}>{blueprint.name}</h1>
                      </header>
                      <main>
                        <img src={blueprint.coverImage} alt="bp img" />
                        <p>{blueprint.description}</p>
                      </main>
                      <footer>
                        <Button onClick={() => this.handleSelect(blueprint.ID)}>
                          <i className="fa fa-columns" aria-hidden="true" />
                          Select Blueprint
                        </Button>
                      </footer>
                    </article>
                  );
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
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    siteZUID: ownProps.match.params.zuid,
    blueprints: state.blueprints,
    createSite: state.createSite
  };
};

export default withRouter(connect(mapStateToProps)(PropertyBlueprint));
