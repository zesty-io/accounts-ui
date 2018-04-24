import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchBlueprints } from "../../../../properties/src/store/blueprints";

import styles from "./EditBlueprint.less";

class EditBlueprint extends Component {
  constructor(props) {
    super();
    this.state = {
      blueprint: props.blueprint
    };
  }
  componentDidMount() {
    if (!this.props.blueprint) {
      this.props.history.push("/settings/blueprints");
    }
  }
  handleSubmit = evt => {
    evt.preventDefault();
    console.log("WEEEEEEEEE!"); // disabled waiting for API endpoint
  };
  handleCancel = evt => {
    evt.preventDefault();
    this.props.history.push("/settings/blueprints");
  }
  onChange = evt => {
    if (evt.target.name === "tags_csv") {
      // handle tags csv delta
      if (this.state.blueprint.tagsCSV.split(',').includes(evt.target.value)) {
        let newTags = this.state.blueprint.tagsCSV.split(",");
        let filteredTags = newTags
          .filter(tag => {
            return tag !== evt.target.value;
          })
          .toString();
        return this.setState({
          blueprint: {
            ...this.state.blueprint,
            tagsCSV: filteredTags
          }
        });
      } else {
        let newTags = this.state.blueprint.tagsCSV.split(",");
        newTags.push(evt.target.value);
        let addedTag = newTags.join(",");
        return this.setState({
          blueprint: {
            ...this.state.blueprint,
            tagsCSV: addedTag
          }
        });
      }
    } else {
      return this.setState({
        blueprint: {
          ...this.state.blueprint,
          [evt.target.name]: evt.target.value
        }
      });
    }
  };
  render() {
    return this.state.blueprint ? (
      <form id="edit-form" onSubmit={this.handleSubmit}>
        <div className={styles.blueprints}>
          <div className={styles.rowOne}>
            <img
              src={`https://raw.githubusercontent.com/${
                this.state.blueprint.name
              }/master/shield.png`}
              alt={this.state.blueprint.name}
            />
            <label>Blueprint Name</label>
            <Input
              type="text"
              size={50}
              onChange={this.onChange}
              value={this.state.blueprint.name}
              name="name"
            />
            <label>Github Repo URL</label>
            <Input
              type="text"
              size={50}
              onChange={this.onChange}
              value={this.state.blueprint.githubURL}
              name="githubURL"
            />
            <label>Blueprint Example Preview URL</label>
            <Input
              type="text"
              size={50}
              onChange={this.onChange}
              value={this.state.blueprint.previewURL}
              name="previewURL"
            />
            <label>
              Shield Image URL (Optional. This will override shield.png in your
              repo.)
            </label>
            <Input
              type="text"
              size={50}
              onChange={this.onChange}
              value={this.state.blueprint.mainImage}
              name="mainImage"
            />
            <label>
              Background Cover Image URL (Optional. This will override
              shield.png in your repo.)
            </label>
            <Input
              size={50}
              onChange={this.onChange}
              value={this.state.blueprint.coverImage}
              name="coverImage"
            />
          </div>
          <h3 className={styles.description}>Description</h3>
          <div className={styles.rowTwo}>
            <label>Short Description</label>
            <textarea
              wrap="soft"
              name="shortDescription"
              onChange={this.onChange}
              value={this.state.blueprint.shortDescription}
            />
          </div>
          <div className={styles.rowTwo1}>
            <label>Description</label>
            <textarea
              wrap="soft"
              name="description"
              onChange={this.onChange}
              value={this.state.blueprint.description}
            />
          </div>
          <h3 className={styles.rowThree}>Tags</h3>
          <div className={styles.opts1}>
            <h4>Categories</h4>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                onChange={this.onChange}
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("18")}
                value="18"
              />Frameworks
            </label>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("3")}
                onChange={this.onChange}
                value="3"
              />Bootstrap 3.5
            </label>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("1")}
                onChange={this.onChange}
                value="1"
              />Zesty Classic Framework
            </label>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                onChange={this.onChange}
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("2")}
                value="2"
              />Landing Pages
            </label>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                onChange={this.onChange}
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("4")}
                value="4"
              />Developer Starts
            </label>
            <h4>Descriptive</h4>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                onChange={this.onChange}
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("19")}
                value="19"
              />Colorful
            </label>
          </div>
          <div className={styles.opts2}>
            <h4>Trends</h4>
            <label>
              <Input
                type="checkbox"
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("20")}
                name="tags_csv"
                onChange={this.onChange}
                value="20"
              />Flat
            </label>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                onChange={this.onChange}
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("21")}
                value="21"
              />Bootstrap
            </label>
          </div>
          <div className={styles.opts3}>
            <h4>Property Traits</h4>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                onChange={this.onChange}
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("6")}
                value="6"
              />Mobile Responsive
            </label>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("7")}
                onChange={this.onChange}
                value="7"
              />Social Share Buttons
            </label>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                onChange={this.onChange}
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("8")}
                value="8"
              />Facebook
            </label>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                onChange={this.onChange}
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("9")}
                value="9"
              />Instagram
            </label>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                onChange={this.onChange}
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("10")}
                value="10"
              />Twitter
            </label>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                onChange={this.onChange}
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("11")}
                value="11"
              />Google+
            </label>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("12")}
                onChange={this.onChange}
                value="12"
              />Authorship
            </label>
          </div>
          <div className={styles.opts4}>
            <h4>Content Traits</h4>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                onChange={this.onChange}
                value="24"
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("24")}
              />Single Page
            </label>
            <label>
              <Input
                type="checkbox"
                name="tags_csv"
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("25")}
                onChange={this.onChange}
                value="25"
              />Multi Page
            </label>
            <label>
              <Input
                type="checkbox"
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("26")}
                name="tags_csv"
                onChange={this.onChange}
                value="26"
              />Blogs
            </label>
            <label>
              <Input
                type="checkbox"
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("27")}
                name="tags_csv"
                onChange={this.onChange}
                value="27"
              />Galleries
            </label>
            <label>
              <Input
                type="checkbox"
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("28")}
                name="tags_csv"
                onChange={this.onChange}
                value="28"
              />Menus
            </label>
            <label>
              <Input
                type="checkbox"
                checked={(this.state.blueprint.tagsCSV || '').split(',').includes("29")}
                name="tags_csv"
                onChange={this.onChange}
                value="29"
              />Business
            </label>
          </div>

          <Button className={styles.bottom3} type="submit" text="Save" />
          <Button className={styles.bottom4} text="Cancel" onClick={this.handleCancel} />
        </div>
      </form>
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blueprint: Object.keys(state.blueprints)
      .map(i => {
        if (state.blueprints[i].ID == ownProps.match.params.id) {
          return state.blueprints[i];
        }
      })
      .filter(i => i !== undefined)[0]
  };
};

export default withRouter(connect(mapStateToProps)(EditBlueprint));
