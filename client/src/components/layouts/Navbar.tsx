import { Component } from "react";
import * as React from "react";
import { MouseEvent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "src/actions/authActions";
import { clearProfile } from "src/actions/profileAction";

class Navbar extends Component<any> {
  constructor(props: any) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }
  public render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Post feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a href="#" onClick={this.onLogoutClick} className="nav-link">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatr connected to your email to display image"
            />
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4 ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            WeConnect
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
  private onLogoutClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    this.props.clearProfile();
    this.props.logoutUser();
  }
}

const mapStateProps = (state: any) => ({
  auth: state.auth
});

export default connect(
  mapStateProps,
  { logoutUser, clearProfile }
)(Navbar);
