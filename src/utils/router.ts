import routeTree, { IRoute } from "../config/routeTree";

function getLayoutRouteList(): IRoute[] {
  return flattenRoute(routeTree, false);
}

/**
 * 界面Layout路由，仅用于App.tsx中区分两种不同的Layout
 */
export const layoutRouteList = getLayoutRouteList();

function getBusinessRouteList() {
  const routes = routeTree.filter(route => route.path === '/');
  return routes.length > 0 ? flattenRoute(routes, true) : [];
}

// 业务路由
export const businessRouteList = getBusinessRouteList();

function getSystemRouteList() {
  const routes = routeTree.filter(route => route.path === '/system');
  return routes.length > 0 ? flattenRoute(routeTree, true) : [];
}

// 系统路由，例如login，register
export const systemRouteList = getSystemRouteList();

// 返回路由
export function getPageTitle(routeTree: IRoute[]): string {
  const route = routeTree.find(child => child.path === window.location.pathname);
  return route ? route.meta.title : '';
}

/**
 * 将路由展开为1维数组
 * @param routeTree 路由树
 * @param nest 是否嵌套展开
 */
export function flattenRoute(routeTree: IRoute[], nest: boolean): IRoute[] {
  const result: IRoute[] = [];
  for (let i = 0; i < routeTree.length; i++) {
    const route = routeTree[i];
    result.push({ ...route });
    // 递归展开子路由
    if (route.children && nest) {
      result.push(...flattenRoute(route.children, nest));
    }
  }
  return result;
}
