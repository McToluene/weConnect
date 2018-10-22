import { Component } from "react";
import * as React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "src/actions/profileAction";

class Education extends Component<any> {
  public render() {
    const education = this.props.education.map((edu: any) => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th>{}</th>
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }

  private onDeleteClick = (id: number) => {
    this.props.deleteEducation(id);
  };
}

export default connect(
  null,
  { deleteEducation }
)(Education);
