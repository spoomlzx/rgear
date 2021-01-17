import React, {Suspense} from 'react';
import {Spin} from "antd";
import {HashRouter as Router, Switch, Route} from "react-router-dom";

import './styles/App.css';
import {layoutRouteList} from "./utils/router";
import {IRoute} from "./config/routeTree";

const App: React.FC<{}> = () => {
  return (
    <Suspense fallback={<Spin size="large" className="layout__loading"/>}>
      <Router>
        <Switch>
          {layoutRouteList.map((route: IRoute) => (
            <Route path={route.path} key={route.path} component={route.component}/>
          ))}
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
