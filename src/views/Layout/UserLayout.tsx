import React, {Suspense} from "react";
import {Spin, Layout, Typography} from "antd";
import {Route, Switch, Link} from "react-router-dom";
import {systemRouteList} from "../../utils/router";
import {IRoute} from "../../config/routeTree";
import './UserLayout.less';
import logo from '../../static/logo.png';

const UserLayout: React.FC<{}> = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="top">
          <Typography.Title>
            <Link to="/">
              <img alt="logo" className="logo" src={logo}/>
              <span className="title">Party members </span>
            </Link>
          </Typography.Title>
        </div>
        <Suspense fallback={<Spin size="large" className="layout__loading"/>}>
          <Switch>
            {systemRouteList.map((menu: IRoute) => (
              <Route exact key={menu.path} path={menu.path} component={menu.component}/>
            ))}
          </Switch>
        </Suspense>
      </div>
      <Layout.Footer style={{textAlign: 'center'}}>
        Remain true to our original aspiration and keep our mission firmly in mind
      </Layout.Footer>
    </div>
  )
}

export default UserLayout;
