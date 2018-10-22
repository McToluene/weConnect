import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addEducation } from "src/actions/profileAction";
import TextArea from "../common/TextArea";
import TextField from "../common/TextField";

interface IAddExperience {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to: string;
  current: any;
  description: string;
  errors: any;
  disabled: boolean;
}

class AddEducation extends Component<any, IAddExperience> {
  constructor(props: any) {
    super(props);
    this.state = {
      current: false,
      degree: "",
      description: "",
      disabled: false,
      errors: {},
      fieldofstudy: "",
      from: "",
      school: "",
      to: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  public render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextField
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                  type="text"
                />

                <TextField
                  placeholder="* Degree or Certificate"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                  type="text"
                />

                <TextField
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
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
                    Current
                  </label>
                </div>
                <TextArea
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the program"
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

    const eduData = {
      current: this.state.current,
      degree: this.state.degree,
      description: this.state.description,
      disabled: this.state.disabled,
      errors: this.state.errors,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      school: this.state.school,
      to: this.state.to
    };

    this.props.addEducation(eduData, this.props.history);
  }

  private onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "school":
        this.setState({ school: value });
        break;
      case "degree":
        this.setState({ degree: value });
        break;
      case "fieldofstudy":
        this.setState({ fieldofstudy: value });
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
  { addEducation }
)(withRouter(AddEducation));
