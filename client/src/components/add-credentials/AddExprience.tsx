import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addExperience } from "src/actions/profileAction";
import TextArea from "../common/TextArea";
import TextField from "../common/TextField";

interface IAddExperience {
  company: string;
  title: string;
  location: string;
  from: string;
  to: string;
  current: any;
  description: string;
  errors: any;
  disabled: boolean;
}

class AddExprience extends Component<any, IAddExperience> {
  constructor(props: any) {
    super(props);
    this.state = {
      company: "",
      current: false,
      description: "",
      disabled: false,
      errors: {},
      from: "",
      location: "",
      title: "",
      to: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  public render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextField
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  type="text"
                />

                <TextField
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  type="text"
                />

                <TextField
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  type="text"
                />

                <h6>From Date</h6>
                <TextField
                  name="from"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  type="date"
                />

                <h6>To Date</h6>
                <TextField
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  type="date"
                  disabled={this.state.disabled ? true : false}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextArea
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the job"
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-light mt-4"
                />
              </form>
            </div>
          </div>
        </div>
        {/* i fucking need space here and the damn footer covering */}
        <div className="space">{}</div>
      </div>
    );
  }

  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  private onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const expData = {
      company: this.state.company,
      current: this.state.current,
      description: this.state.description,
      disabled: this.state.disabled,
      errors: this.state.errors,
      from: this.state.from,
      location: this.state.location,
      title: this.state.title,
      to: this.state.to
    };

    this.props.addExperience(expData, this.props.history);
  }

  private onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "company":
        this.setState({ company: value });
        break;
      case "title":
        this.setState({ title: value });
        break;
      case "location":
        this.setState({ location: value });
        break;
      case "from":
        this.setState({ from: value });
        break;
      case "to":
        this.setState({ to: value });
        break;
      case "description":
        this.setState({ description: value });
        break;
    }
  }

  private onCheck() {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  }
}

const mapStateToProps = (state: any) => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExprience));
