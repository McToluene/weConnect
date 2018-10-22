import { Component } from "react";
import * as React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "src/actions/profileAction";

class Experience extends Component<any> {
  public render() {
    const experience = this.props.experience.map((exp: any) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th>{}</th>
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }

  private onDeleteClick = (id: number) => {
    this.props.deleteExperience(id);
  };
}

export default connect(
  null,
  { deleteExperience }
)(Experience);
