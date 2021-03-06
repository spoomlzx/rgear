import React from "react";
import {connect} from "react-redux";
import {Redirect, Route, RouteComponentProps, withRouter} from 'react-router-dom';
import {ADMIN, IRoute} from "../../config/routeTree";
import {IStoreState} from "../../store/types";

interface AuthRouteProps extends RouteComponentProps {
  route: IRoute;
  token: string;
  role: string;
}

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const {route, token, role} = props;
  if (!token) {
    return (
      <Redirect to="/system/login"/>
    )
  }
  if (!(role === ADMIN || !route.roles || route.roles.includes(role))) {
    return <Redirect to="/error/403" push/>;
  }
  if (route.redirect) {
    return <Redirect to={route.redirect!} push/>;
  }
  return <Route key={route.path} path={route.path} component={route.component}/>;
}

export default connect(({user}: IStoreState) => ({token: user.token, role: user.role}))(withRouter(AuthRoute));
