import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { getProfiles } from "src/actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";

class Profiles extends Component<any> {
  public componentDidMount() {
    this.props.getProfiles();
  }

  public render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map((profile: any) => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developers profile</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
        {/* i fucking need space here and the damn footer covering */}
        <div className="space">{}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
