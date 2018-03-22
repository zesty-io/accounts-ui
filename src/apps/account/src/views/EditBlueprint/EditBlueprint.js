import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./EditBlueprint.less";

class EditBlueprint extends Component {
	handleSubmit = (evt) => {
		evt.preventDefault()
		console.log('WEEEEEEEEE!') // disabled for now
	}
  render() {
		let { blueprint } = this.props
    return this.props && this.props.blueprint ? (
      <div className={styles.blueprints}>
        <form id="edit-form" onSubmit={this.handleSubmit}>
          <div>
            <div>
              <img
                src={`https://raw.githubusercontent.com/${
                  blueprint.Name
                }/master/shield.png`}
                alt={blueprint.Name}
              />
            </div>

            <div>
              <fieldset>
                <label>Blueprint Name</label>
                <Input
                  type="text"
                  placeholder={blueprint.Name}
                  name="edit[name]"
                />
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
                <br />
                <br />
                <a href={`/some way to the creator/${blueprint.ID}/`}>View Plate in Creator</a>
              </fieldset>
            </div>
            <div>
              <label>
                Shield Image URL (Optional. This will override shield.png in
                your repo.)
              </label>
              <Input type="text" value={blueprint.MainImage} name="edit[main_image]" />

              <label>
                Background Cover Image URL (Optional. This will override
                shield.png in your repo.)
              </label>
              <Input type="text" value={blueprint.CoverImage} name="edit[cover_image]" />
            </div>
          </div>
          <hr />
          <div>
            <div>
              <label>Short Description</label>
              <textarea name="edit[short_description]" value={blueprint.ShortDescription} />
            </div>
            <div>
              <label>Description</label>
              <textarea name="edit[description]" value={blueprint.Description} />
            </div>
          </div>
          <hr />

          <label>Tags</label>
          <div>
            <Input type="hidden" name="edit[tags_csv][]" value="" />
            <div>
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
            </div>
            <div>
              <h4>Descriptive</h4>
              <label>
                <Input type="checkbox" name="edit[tags_csv][]" value="19" />Colorful
              </label>
            </div>
            <div>
              <h4>Trends</h4>
              <label>
                <Input type="checkbox" name="edit[tags_csv][]" value="20" />Flat
              </label>
              <label>
                <Input type="checkbox" name="edit[tags_csv][]" value="21" />Bootstrap
              </label>
            </div>
            <div>
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
            <div>
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
          </div>
          <hr />
          <Button type="submit" text="Save" />
        </form>
      </div>
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
