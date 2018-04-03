import { Component } from "React";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import styles from "./PropertyBlueprint.less";

import { fetchBlueprints } from "../../store/blueprints";
import { addSiteInfo, postNewSite } from "../../store/createSite";

class PropertyBlueprint extends Component {
  componentWillMount() {
    this.props.dispatch(fetchBlueprints());
  }
  handleSelect = id => {
    return console.log('bpID: ', id, 'siteZuid: ', this.props.siteZUID)
    // TODO make api request to set blueprint for site
    this.props.dispatch(addSiteInfo({ blueprintId: id }));
    // TODO user returned zuid
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
                  if (!this.props.blueprints[i].Trashed) {
                    return i;
                  }
                })
                .map(i => {
                  let blueprint = this.props.blueprints[i];
                  return (
                    <article className={styles.Blueprint} key={i}>
                      <header>
                        <h1 className={styles.name}>{blueprint.Name}</h1>
                      </header>
                      <main>
                        <img src={blueprint.CoverImage} alt="bp img" />
                        <p>{blueprint.Description}</p>
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
  return { siteZUID: ownProps.match.params.zuid, blueprints: state.blueprints };
};

export default withRouter(connect(mapStateToProps)(PropertyBlueprint));
