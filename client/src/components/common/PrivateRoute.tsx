import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

interface IPrivateRoute {
  auth: any;
  Component: React.ComponentClass;
  exact?: boolean;
  path: string;
}

const PrivateRoute: React.SFC<IPrivateRoute> = ({
  Component,
  auth,
  ...rest
}) => (
  <Route
    {...rest}
    render={
      // tslint:disable-next-line:jsx-no-lambda
      function show(props: any): React.ReactNode {
        // tslint:disable-next-line:no-unused-expression
        return auth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }
    }
  />
);

const mapStateToProps = (state: any) => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);
