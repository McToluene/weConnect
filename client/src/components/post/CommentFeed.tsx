import { Component } from "react";
import * as React from "react";
import CommentItem from "./CommentItem";

class CommentFeed extends Component<any> {
  public render() {
    const { comments, postId } = this.props;

    return comments.map((comment: any) => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ));
  }
}
export default CommentFeed;
