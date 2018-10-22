import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Landing extends Component<any> {
  public componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  public render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-centre">
                <h4 className="display-3 mb-2 home">
                  A social network for developers
                </h4>
                <p className="lead home-sm">
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <Link to="/register" className="btn btn-lg btn-info mr-2 myBtn">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-info myBtn">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
