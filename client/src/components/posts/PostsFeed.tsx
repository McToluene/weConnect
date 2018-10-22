import { Component } from "react";
import * as React from "react";
import PostItem from "./PostsItem";

class PostsFeed extends Component<any> {
  public render() {
    const { posts } = this.props;
    return posts.map((post: any) => <PostItem key={post._id} post={post} />);
  }
}
export default PostsFeed;
