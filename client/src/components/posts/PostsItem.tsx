import classnames from "classnames";
import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, deletePost, removeLike } from "src/actions/postAction";

class PostItem extends Component<any> {
  public static defaultProps: { showActions: boolean };
  public render() {
    const { auth, post, showActions } = this.props;
    return (
      <div className="posts">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-sm-4">
              <Link to="/profile">
                <img
                  src={post.avatar}
                  className="rounded-circle d-none d-md-block"
                  alt=""
                />
              </Link>
              <br />
              <p className="text-center">{post.name}</p>
            </div>
            <div className="col-md-8">
              <p className="lead">{post.text}</p>
              {showActions ? (
                <span>
                  {" "}
                  <button
                    onClick={this.onLikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames("fas fa-thumbs-up", {
                        "text-info": this.findUserLike(post.likes)
                      })}
                    />
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    onClick={this.onUnLikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info  mr-1">
                    Comments
                  </Link>
                  {post.user === auth.user.id ? (
                    <button
                      type="buttom"
                      onClick={this.onDeleteClick.bind(this, post._id)}
                      className="btn btn-danger"
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onDeleteClick(id: number) {
    this.props.deletePost(id);
  }

  private onLikeClick(id: number) {
    this.props.addLike(id);
  }

  private onUnLikeClick(id: number) {
    this.props.removeLike(id);
  }

  private findUserLike(likes: []): boolean {
    const { auth } = this.props;
    if (likes.filter((like: any) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
}

PostItem.defaultProps = {
  showActions: true
};

const mapStateToProps = (state: any) => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
