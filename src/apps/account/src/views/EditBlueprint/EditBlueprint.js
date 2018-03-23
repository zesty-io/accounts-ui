import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./EditBlueprint.less";

class EditBlueprint extends Component {
  handleSubmit = evt => {
    evt.preventDefault();
    console.log("WEEEEEEEEE!"); // disabled for now
  };
  render() {
    let { blueprint } = this.props;
    return this.props && this.props.blueprint ? (
      <form id="edit-form" onSubmit={this.handleSubmit}>
        <div className={styles.blueprints}>
          <div className={styles.rowOne}>
            <img
              src={`https://raw.githubusercontent.com/${
                blueprint.Name
              }/master/shield.png`}
              alt={blueprint.Name}
            />
            <label>Blueprint Name</label>
            <Input type="text" placeholder={blueprint.Name} name="edit[name]" />
            <label>Github Repo URL</label>
            <Input
              type="text"
              placeholder={blueprint.GithubURL}
              name="edit[github_url]"
            />
            <label>Blueprint Example Preview URL</label>
            <Input
              type="text"
              placeholder={blueprint.PreviewURL}
              name="edit[preview_url]"
            />
            <label>
              Shield Image URL (Optional. This will override shield.png in your
              repo.)
            </label>
            <Input
              type="text"
              placeholder={blueprint.MainImage}
              name="edit[main_image]"
            />
            <label>
              Background Cover Image URL (Optional. This will override
              shield.png in your repo.)
            </label>
            <Input
              type="text"
              placeholder={blueprint.CoverImage}
              name="edit[cover_image]"
            />
          </div>
          <div className={styles.rowTwo}>
            <label>Short Description</label>
            <textarea
              rows={10}
              cols={25}
              wrap="soft"
              name="edit[short_description]"
              placeholder={blueprint.ShortDescription}
            />
          </div>
          <div className={styles.rowTwo1}>
            <label>Description</label>
            <textarea
              rows={20}
              cols={35}
              wrap="soft"
              name="edit[description]"
              placeholder={blueprint.Description}
            />
          </div>
          <h3 className={styles.rowThree}>Tags</h3>
            <Input type="hidden" name="edit[tags_csv][]" value="" />
            <div className={styles.opts1}>
            <h4>Categories</h4>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="18" />Frameworks
            </label>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="3" />Bootstrap
              3.5
            </label>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="1" />Zesty
              Classic Framework
            </label>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="2" />Landing
              Pages
            </label>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="4" />Developer
              Starts
            </label>
            <h4>Descriptive</h4>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="19" />Colorful
            </label>
            </div>
            <div className={styles.opts2}>            
            <h4>Trends</h4>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="20" />Flat
            </label>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="21" />Bootstrap
            </label>
            </div>
            <div className={styles.opts3}>            
            <h4>Property Traits</h4>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="6" />Mobile
              Responsive
            </label>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="7" />Social
              Share Buttons
            </label>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="8" />Facebook
            </label>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="9" />Instagram
            </label>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="10" />Twitter
            </label>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="11" />Google+
            </label>
            <label>
              <Input type="checkbox" name="edit[tags_csv][]" value="12" />Authorship
            </label>
            </div>
            <div className={styles.opts4}>
              <h4>Content Traits</h4>
              <label>
                <Input type="checkbox" name="edit[tags_csv][]" value="24" />Single
                Page
              </label>
              <label>
                <Input type="checkbox" name="edit[tags_csv][]" value="25" />Multi
                Page
              </label>
              <label>
                <Input type="checkbox" name="edit[tags_csv][]" value="26" />Blogs
              </label>
              <label>
                <Input type="checkbox" name="edit[tags_csv][]" value="27" />Galleries
              </label>
              <label>
                <Input type="checkbox" name="edit[tags_csv][]" value="28" />Menus
              </label>
              <label>
                <Input type="checkbox" name="edit[tags_csv][]" value="29" />Business
              </label>
            </div>
            
            <Button className={styles.bottom2} type="submit" text="Save" />
            <Button className={styles.bottom3} text="Cancel" />
            <Button className={styles.bottom4} text="Edit in Creator" />
        </div>
      </form>
    ) : (
      <p>No Blueprint Found</p>
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
