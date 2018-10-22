import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "src/actions/postAction";
import Spinner from "../common/Spinner";
import PostsItem from "../posts/PostsItem";
import CommentFeed from "./CommentFeed";
import CommentForm from "./CommentForm";

class Post extends Component<any> {
  public render() {
    const { post, loading } = this.props.post;

    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostsItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
        {/* i fucking need space here and the damn footer covering */}
        <div className="space">{}</div>
      </div>
    );
  }

  public componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPost(id);
  }
}

const mapStateToProps = (state: any) => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
