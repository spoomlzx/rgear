import React, {Suspense} from "react";
import {Breadcrumb, Layout, Menu, Spin} from "antd";
import {withRouter, Switch, Route} from "react-router-dom";
import {businessRouteList} from "../../utils/router";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {IRoute} from "../../config/routeTree";
import AuthRoute from "./AuthRoute";

const {Header, Content, Footer} = Layout;

interface MainLayoutProps {
  location: any;
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo"/>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{height: "calc(100% - 100px)"}}>
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Suspense fallback={<Spin size="large" className="layout__loading"/>}>
          <TransitionGroup>
            <CSSTransition timeout={300} classNames="fade">
              <Switch location={props.location}>
                {
                  businessRouteList.map((route: IRoute) => {
                    return (
                      <Route
                        key={route.path}
                        exact={route.path !== '*'}
                        path={route.path}
                        render={props => (
                          <AuthRoute {...props} route={route}/>
                        )}
                      />
                    )
                  })
                }
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </Suspense>
      </Content>
      <Footer style={{textAlign: 'center'}}>RGear ©2018 Created by Spoom</Footer>
    </Layout>
  )
}

export default withRouter(MainLayout);
