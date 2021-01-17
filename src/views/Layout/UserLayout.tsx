import React, {Suspense} from "react";
import {Spin} from "antd";
import {Route, Switch} from "react-router-dom";
import {systemRouteList} from "../../utils/router";
import {IRoute} from "../../config/routeTree";

const UserLayout: React.FC<{}> = () => {
  return (
    <div>
      <div>user layout</div>
      <Suspense fallback={<Spin size="large" className="layout__loading"/>}>
        <Switch>
          {systemRouteList.map((menu: IRoute) => (
            <Route exact key={menu.path} path={menu.path} component={menu.component}/>
          ))}
        </Switch>
      </Suspense>
    </div>
  )
}

export default UserLayout;
