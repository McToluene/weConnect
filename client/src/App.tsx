import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as jwt_decode from "jwt-decode";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import { clearProfile } from "./actions/profileAction";
import "./App.css";
import AddEducation from "./components/add-credentials/AddEducation";
import AddExprience from "./components/add-credentials/AddExprience";
import Login from "./components/auth/Login";
import Resgister from "./components/auth/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import Dashboard from "./components/dashboard/Dashboard";
import EditProfile from "./components/edit-profile/EditProfile";
import { Footer } from "./components/layouts/Footer";
import Landing from "./components/layouts/Landing";
import Navbar from "./components/layouts/Navbar";
import Post from "./components/post/Post";
import Posts from "./components/posts/Posts";
import Profile from "./components/profile/Profile";
import Profiles from "./components/profiles/Profiles";
import store from "./Store";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.jwtToken) {
  // set auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info
  const decoded: any = jwt_decode(localStorage.jwtToken);
  // set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearProfile());
    // redirect to login
    window.location.href = "/login";
  }
}

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact={true} path="/" component={Landing} />
            <div className="container">
              <Route exact={true} path="/register" component={Resgister} />
              <Route exact={true} path="/login" component={Login} />
              <Route exact={true} path="/profiles" component={Profiles} />
              <Route
                exact={true}
                path="/profile/handle/:handle"
                component={Profile}
              />
              <Switch>
                <PrivateRoute
                  exact={true}
                  path="/dashboard"
                  Component={Dashboard}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact={true}
                  path="/create-profile"
                  Component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact={true}
                  path="/edit-profile"
                  Component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact={true}
                  path="/add-experience"
                  Component={AddExprience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact={true}
                  path="/add-education"
                  Component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact={true} path="/feed" Component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact={true} path="/post/:id" Component={Post} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
