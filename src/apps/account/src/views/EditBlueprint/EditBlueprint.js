import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./EditBlueprint.less";

class EditBlueprint extends Component {
  render() {
    return (
      <div className={styles.blueprints}>
        <p>{JSON.stringify(this.props.blueprint)}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blueprint: Object.keys(state.blueprints).map(i => {
      if(state.blueprints[i].ID == ownProps.match.params.id){
        return state.blueprints[i]
      }
    }).filter(i => i !== undefined)[0]
  }
}

export default withRouter(connect(mapStateToProps)(EditBlueprint));

/* copy from current edit blueprint
<form method="post" action="/+/actions/edit_plate/" id="edit-form" novalidate="novalidate">
			<div class="z-row">

				
					<div class="z-col z-five-one">
						<img src="https://raw.githubusercontent.com//asads/master/shield.png" alt="asdasdasd">
					</div>

				
				<div class="z-col z-five-two">
					<fieldset>
						<label>Blueprint Name</label>
						<input type="text" value="asdasdasd" name="edit[name]">
						<label>Github Repo URL</label>
						<input type="text" value="asads" name="edit[github_url]">
						<label>Blueprint Example Preview URL</label>
						<input type="text" value="asdasdas" name="edit[preview_url]">
<br>
						<br>
						<a class="button" href="#!/sites/plates/270/">View Plate in Creator</a>				</fieldset></div>
				<div class=" z-col z-five-two">


					<label>Shield Image URL (Optional. This will override shield.png in your repo.)</label>
					<input type="text" value="" name="edit[main_image]" style="max-width: none">

					<label>Background Cover Image URL (Optional. This will override shield.png in your repo.)</label>
					<input type="text" value="" name="edit[cover_image]" style="max-width: none">

				</div>
			</div>
			<hr>
			<div class="z-row">
				<div class="check-fields z-col z-four-two">
					<label>Short Description</label>
					<textarea class="" name="edit[short_description]"></textarea>
				</div>
				<div class="check-fields z-col z-four-two">
					<label>Description</label>
					<textarea name="edit[description]"></textarea>
				</div>
			</div>
			<hr>
			<!--
			<label>Cost</label>
			<input type="text" value="" name="edit[cost]">
			   -->

			<label>Tags</label>
				<div class="z-row">
					<input type="hidden" name="edit[tags_csv][]" value="">

					<div class="check-fields z-col z-five-one"><h4>Categories</h4><label><input type="checkbox" name="edit[tags_csv][]" value="18">Frameworks</label><label><input type="checkbox" name="edit[tags_csv][]" value="3">Bootstrap 3.5</label><label><input type="checkbox" name="edit[tags_csv][]" value="1">Zesty Classic Framework</label><label><input type="checkbox" name="edit[tags_csv][]" value="2">Landing Pages</label><label><input type="checkbox" name="edit[tags_csv][]" value="4">Developer Starts</label></div><div class="check-fields z-col z-five-one"><h4>Descriptive</h4><label><input type="checkbox" name="edit[tags_csv][]" value="19">Colorful</label></div><div class="check-fields z-col z-five-one"><h4>Trends</h4><label><input type="checkbox" name="edit[tags_csv][]" value="20">Flat</label><label><input type="checkbox" name="edit[tags_csv][]" value="21">Bootstrap</label></div><div class="check-fields z-col z-five-one"><h4>Property Traits</h4><label><input type="checkbox" name="edit[tags_csv][]" value="6">Mobile Responsive</label><label><input type="checkbox" name="edit[tags_csv][]" value="7">Social Share Buttons</label><label><input type="checkbox" name="edit[tags_csv][]" value="8">Facebook</label><label><input type="checkbox" name="edit[tags_csv][]" value="9">Instagram</label><label><input type="checkbox" name="edit[tags_csv][]" value="10">Twitter</label><label><input type="checkbox" name="edit[tags_csv][]" value="11">Google+</label><label><input type="checkbox" name="edit[tags_csv][]" value="12">Authorship</label></div><div class="check-fields z-col z-five-one"><h4>Content Traits</h4><label><input type="checkbox" name="edit[tags_csv][]" value="24">Single Page</label><label><input type="checkbox" name="edit[tags_csv][]" value="25">Multi Page</label><label><input type="checkbox" name="edit[tags_csv][]" value="26">Blogs</label><label><input type="checkbox" name="edit[tags_csv][]" value="27">Galleries</label><label><input type="checkbox" name="edit[tags_csv][]" value="28">Menus</label><label><input type="checkbox" name="edit[tags_csv][]" value="29">Business</label></div>				</div>
				<hr>

			<input type="hidden" name="edit[tags_csv][]" value="30">

			<!--
				<label>Default Recipes</label>
				<div class="z-row">
					<input type="hidden" name="edit[default_recipes_csv][]" value="">
				<div class="check-fields z-col z-five-one"><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="23">About Company with Team</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="22">About Page</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="25">About Page with Full Width Image</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="5">Articles</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="21">Basic FAQ Page</label></div><div class="check-fields z-col z-five-one"><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="24">Basic Schedule Page</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="2">Blog</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="20">Brandfolder Page</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="6">Contact Page</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="26">Contact Page with Form</label></div><div class="check-fields z-col z-five-one"><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="16">Fancy Menu</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="7">jQuery Gallery Page with Magnific</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="15">Menu Squares</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="8">Portfolio</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="18">Search Page</label></div><div class="check-fields z-col z-five-one"><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="14">Services</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="13">Simple Menu</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="1">Simple Page</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="17">Simple Products with Paypal</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="9">Simple Team</label></div><div class="check-fields z-col z-five-one"><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="27">Social Feed</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="11">Team</label><label><input type="checkbox"  name="edit[default_recipes_csv][]" value="19">YouTube Page</label>				</div>
				<hr>
				<label>Default Garnishes</label>
				<div class="z-row">
					<input type="hidden" name="edit[default_garnishes_csv][]" value="">
				<div class="check-fields z-col z-five-one"><label><input type="checkbox"  name="edit[default_garnishes_csv][]" value="9">Awesome Social Links</label><label><input type="checkbox"  name="edit[default_garnishes_csv][]" value="1">Disqus Commenting System</label></div><div class="check-fields z-col z-five-one"><label><input type="checkbox"  name="edit[default_garnishes_csv][]" value="4">Grey Social Links</label><label><input type="checkbox"  name="edit[default_garnishes_csv][]" value="3">Informational Squares</label></div><div class="check-fields z-col z-five-one"><label><input type="checkbox"  name="edit[default_garnishes_csv][]" value="5">jQuery Unslider</label><label><input type="checkbox"  name="edit[default_garnishes_csv][]" value="2">Nivo Slider</label></div><div class="check-fields z-col z-five-one"><label><input type="checkbox"  name="edit[default_garnishes_csv][]" value="6">ShareThis Buttons</label><label><input type="checkbox"  name="edit[default_garnishes_csv][]" value="7">Sidebar Contact Form</label></div><div class="check-fields z-col z-five-one"><label><input type="checkbox"  name="edit[default_garnishes_csv][]" value="8">Simple Navigation</label>				</div>
				<hr>
				<label>Default Addons</label>
				<div class="z-row">
					<input type="hidden" name="edit[default_addons_csv][]" value="">
				<div class="check-fields z-col z-five-one"><label><input type="checkbox"  name="edit[default_addons_csv][]" value="11">Dedicated IP</label></div><div class="check-fields z-col z-five-one"><label><input type="checkbox"  name="edit[default_addons_csv][]" value="15">SSL Certificate</label></div>				</div>
				-->
					
			<input type="hidden" name="id" value="270">
			<input type="hidden" name="edit[zesty_certified]" value="0">
			<input type="hidden" name="edit[creator_id]" value="21474522">
			<input type="submit" class="button" data-alt-text="Save..." value="Save">
		</form>*/