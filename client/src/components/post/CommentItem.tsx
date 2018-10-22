import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/postAction";

class CommentItem extends Component<any> {
  public render() {
    const { auth, comment, postId } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-4">
            <Link to="/profile">
              <img
                src={comment.avatar}
                alt=""
                className="rounded-circle d-none d-md-block"
              />
            </Link>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-6">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                type="buttom"
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  private onDeleteClick(postId: number, commentId: number) {
    this.props.deleteComment(postId, commentId);
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
