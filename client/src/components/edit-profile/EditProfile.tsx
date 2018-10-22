import * as React from "react";
import { Component } from "react";
import { ChangeEvent, MouseEvent } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from "src/actions/profileAction";
import { isEmpty } from "src/validation/is-empty";
import SelectListGroup from "../common/SelectListGroup";
import TextArea from "../common/TextArea";
import TextField from "../common/TextField";
import TextFieldGroup from "../common/TextFieldGroup";

interface ICreateProfile {
  displaySocialInputs?: boolean;
  handle: string;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string;
  githubusername: string;
  bio: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  instagram: string;
  errors: any;
}

class EditProfile extends Component<any, ICreateProfile> {
  constructor(props: any) {
    super(props);
    this.state = {
      bio: "",
      company: "",
      displaySocialInputs: false,
      errors: {},
      facebook: "",
      githubusername: "",
      handle: "",
      instagram: "",
      linkedin: "",
      location: "",
      skills: "",
      status: "",
      twitter: "",
      website: "",
      youtube: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.toggle = this.toggle.bind(this);
    this.textArea = this.textArea.bind(this);
  }

  public render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <TextFieldGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter-square"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
            type="text"
          />

          <TextFieldGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook-square"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
            type="text"
          />

          <TextFieldGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
            type="text"
          />

          <TextFieldGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
            type="text"
          />

          <TextFieldGroup
            placeholder="Youtube channel URL"
            name="youtube"
            icon="fab fa-youtube-square"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
            type="text"
          />
        </div>
      );
    }
    // select options for status
    const options = [
      { label: "* Select Professional status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Manager", value: "Senior Manager" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or learning" },
      { label: "Instructor or Teacher", value: "Instrcutor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit profile</h1>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextField
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  error={errors.handle}
                  info=" A unique handle for your profile URL. Your full name, company name, nickname"
                  type="text"
                  onChange={this.onChange}
                />

                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  onChange={this.onSelect}
                  options={options}
                  error={errors.status}
                  info={`Where you're at in your career`}
                />

                <TextField
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                  type="text"
                  onChange={this.onChange}
                />

                <TextField
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  error={errors.website}
                  info="Could be your own website or company you work for"
                  type="text"
                  onChange={this.onChange}
                />

                <TextField
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  error={errors.location}
                  info="City or city and state"
                  type="text"
                  onChange={this.onChange}
                />

                <TextField
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  error={errors.skills}
                  info="Please use comma separated values (e.g. HTML,CSS,JAVASCRIPT)"
                  type="text"
                  onChange={this.onChange}
                />

                <TextField
                  placeholder="Github username"
                  name="githubusername"
                  value={this.state.githubusername}
                  error={errors.githubusername}
                  info="If you want your latest repos and Github link, inclued your username"
                  type="text"
                  onChange={this.onChange}
                />

                <TextArea
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                  onChange={this.textArea}
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={this.toggle}
                    className="btn btn-light"
                  >
                    Add Social Network link
                  </button>
                  <span className="text-muted ml-2">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
                {/* i fucking need space here and the damn footer covering */}
                <div className="space">{}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    this.props.getCurrentProfile();
  }

  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(",");

      // If profile field doesnt exists, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";

      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";

      // Set compnonent field state
      this.setState({
        bio: profile.bio,
        company: profile.company,
        facebook: profile.facebook,
        githubusername: profile.githubusername,
        handle: profile.handle,
        instagram: profile.instagram,
        linkedin: profile.linkedin,
        location: profile.location,
        skills: skillsCSV,
        status: profile.status,
        twitter: profile.twitter,
        website: profile.website,
        youtube: profile.youtube
      });
    }
  }

  private onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const profileData: ICreateProfile = {
      bio: this.state.bio,
      company: this.state.company,
      errors: this.state.errors,
      facebook: this.state.facebook,
      githubusername: this.state.githubusername,
      handle: this.state.handle,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin,
      location: this.state.location,
      skills: this.state.skills,
      status: this.state.status,
      twitter: this.state.twitter,
      website: this.state.website,
      youtube: this.state.youtube
    };

    this.props.createProfile(profileData, this.props.history);
  }

  private onChange(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "handle":
        this.setState({ handle: value });
        break;
      case "company":
        this.setState({ company: value });
        break;
      case "website":
        this.setState({ website: value });
        break;
      case "location":
        this.setState({ location: value });
        break;
      case "skills":
        this.setState({ skills: value });
        break;
      case "githubusername":
        this.setState({ githubusername: value });
        break;
      case "twitter":
        this.setState({ twitter: value });
        break;
      case "facebook":
        this.setState({ facebook: value });
        break;
      case "linkedin":
        this.setState({ linkedin: value });
        break;
      case "instagram":
        this.setState({ instagram: value });
        break;
      case "youtube":
        this.setState({ youtube: value });
    }
  }

  private onSelect(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({ status: event.target.value });
  }

  private textArea(event: ChangeEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    this.setState({ bio: event.target.value });
  }

  private toggle(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.setState(prevState => ({
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  }
}

const mapStateToProps = (state: any) => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
