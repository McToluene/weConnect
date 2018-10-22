import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "src/actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCred";
import ProfileGit from "./ProfileGit";
import ProfileHeader from "./ProfileHeader";

class Profile extends Component<any> {
  public render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-8">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to profiles
              </Link>
            </div>
            <div className="col-md-8" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGit username={profile.githubusername} />
          ) : null}

          {/* i fucking need space here and the damn footer covering */}
          <div className="space">{}</div>
        </div>
      );
    }
    
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    const handle = this.props.match.params.handle;
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(handle);
    }
  }
}

const mapStateToProps = (state: any) => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
