import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { addComment } from "src/actions/postAction";
import TextArea from "../common/TextArea";

interface IPostForm {
  text: string;
  errors: any;
}

class CommentForm extends Component<any, IPostForm> {
  constructor(props: any) {
    super(props);
    this.state = {
      errors: {},
      text: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextArea
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  private onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      avatar: user.avatar,
      name: user.name,
      text: this.state.text
    };

    this.props.addComment(postId, newComment);
    this.setState({ text: "" });
  }

  private onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ text: event.target.value });
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
