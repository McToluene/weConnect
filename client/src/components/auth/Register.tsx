import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "src/actions/authActions";

import TextFieldGroup from "../common/TextFieldGroup";

export interface IRegister {
  name: string;
  email: string;
  password: string;
  confirm: string;
  errors: IRegistration;
}

interface IRegistration {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

class Resgister extends Component<any, IRegister> {
  constructor(props: any) {
    super(props);
    this.state = {
      confirm: "",
      email: "",
      errors: {},
      name: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container col-md-6">
          <div className="row mt-4">
            <div className="col-md-8 m-auto order-md-2 mt-3">
              <h2 className="display-4 text-center">Sign Up</h2>
              <p className="lead text-center">Create your account</p>
              <form onSubmit={this.onSubmit}>
                <div className="col-auto">
                  <TextFieldGroup
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onChange}
                    type="text"
                    error={errors.name}
                    icon="fa fa-address-book"
                  />

                  <TextFieldGroup
                    name="email"
                    placeholder="user@example.com"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    icon="fa fa-at"
                    type="text"
                    info="This site uses Gravatr so if you want a profile image, use a Gravatar email"
                  />

                  <TextFieldGroup
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                    icon="fa fa-lock"
                    type="password"
                  />

                  <TextFieldGroup
                    name="confirm"
                    placeholder="Confirm password"
                    value={this.state.confirm}
                    onChange={this.onChange}
                    error={errors.confirm}
                    icon="fa fa-lock"
                    type="password"
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4 " />
              </form>
              {/* i fucking need space here and the damn footer covering */}
              <div className="space">{}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public componentWillReceiveProps(props: any) {
    if (props.errors) {
      this.setState({ errors: props.errors });
    }
  }

  public componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  private onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    switch (inputName) {
      case "name":
        this.setState({ name: inputValue });
        break;
      case "email":
        this.setState({ email: inputValue });
        break;
      case "password":
        this.setState({ password: inputValue });
        break;
      case "confirm":
        this.setState({ confirm: inputValue });
        break;
    }
  }

  private onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newUser = {
      confirm: this.state.confirm,
      email: this.state.email,
      name: this.state.name,
      password: this.state.password
    };

    this.props.registerUser(newUser, this.props.history);
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Resgister));
