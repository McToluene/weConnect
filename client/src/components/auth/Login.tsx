import { ChangeEvent, Component, FormEvent } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { loginUser } from "src/actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

export interface ILogin {
  email: string;
  password: string;
  errors: any;
}
class Login extends Component<any, ILogin> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      errors: {},
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  public render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container col-md-6 mt-5">
          <div className="row mt-5">
            <div className="col-md-8 m-auto order-2">
              <h2 className="display-4 text-center">Login</h2>
              <p className="lead text-center">Sign in to connect</p>
              <form onSubmit={this.onSubmit}>
                <div className="col-auto">
                  <TextFieldGroup
                    placeholder="Enter email address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    icon="fa fa-at"
                  />

                  <TextFieldGroup
                    placeholder="Enter Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                    icon="fa fa-lock"
                  />
                </div>
                <input type="submit" className="btn btn-block btn-info mt-4" />
              </form>
              {/* i fucking need space here and the damn footer covering */}
              <div className="space">{}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  public componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  private onChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    switch (name) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
    }
  }

  private onSubmit(event: FormEvent) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
