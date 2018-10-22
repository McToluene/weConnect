import { Component } from "react";
import * as React from "react";
import { Link } from "react-router-dom";

interface IProfileGit {
  clientID: string;
  clientSecret: string;
  count: number;
  sort: string;
  repos: any;
}

class ProfileGit extends Component<any, IProfileGit> {
  constructor(props: any) {
    super(props);
    this.state = {
      clientID: "987dbde1aaa7c02220c7",
      clientSecret: "f29cc6be304a756994e38fff06d993cd1ddde167",
      count: 5,
      repos: [],
      sort: "created: asc"
    };
  }

  public componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientID, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secrect=${clientSecret}`
    )
      .then(res =>
        res.json().then(data => {
          this.setState({ repos: data });
        })
      )
      // tslint:disable-next-line:no-console
      .catch(err => console.log(err));
  }

  public render() {
    const { repos } = this.state;
    const repoItems = repos.map((repo: any) => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success ">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}
export default ProfileGit;
