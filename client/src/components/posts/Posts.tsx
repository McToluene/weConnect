import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { getPosts } from "src/actions/postAction";
import Spinner from "../common/Spinner";
import PostFeed from "./PostsFeed";
import PostForm from "./PostsForm";

class Posts extends Component<any> {
  public render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <PostForm />
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
    this.props.getPosts();
  }
}

const mapStateToProps = (state: any) => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
