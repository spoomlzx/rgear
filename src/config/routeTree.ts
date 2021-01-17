import React from 'react';

export interface IRouteBase {
  // 路由路径
  path: string;
  // 路由组件
  component?: any;
  // 302 跳转
  redirect?: string;
  // 路由信息
  meta: IRouteMeta;
  // 拥有权限的角色,"admin","user","guest"
  roles?: Array<string>;
}

export interface IRouteMeta {
  title: string;
  icon?: string;
}

export interface IRoute extends IRouteBase {
  children?: IRoute[];
}

export const ADMIN = "admin";
export const USER = "user";

const routeTree: IRoute[] = [
  {
    path: '/system',
    component: React.lazy(() => import('../views/Layout/UserLayout')),
    meta: {
      title: '系统路由',
    },
    redirect: '/system/login',
    children: [
      {
        path: '/system/login',
        component: React.lazy(() => import('../views/System/Login')),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/system/register',
        component: React.lazy(() => import('../views/System/Register')),
        meta: {
          title: '注册',
        },
      },
    ],
  },
  {
    path: '/',
    component: React.lazy(() => import('../views/Layout/MainLayout')),
    meta: {
      title: '系统',
    },
    redirect: '/dashboard/index',
    children: [
      {
        path: '/dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
        },
        redirect: '/dashboard/index',
        children: [
          {
            path: '/dashboard/index',
            component: React.lazy(() => import('../views/Dashboard/index')),
            meta: {
              title: '数据展示',
              icon: 'read',
            },
          },
        ],
      },
      {
        path: '/info',
        meta: {
          title: '信息管理',
          icon: 'info',
        },
        redirect: '/info/committee',
        children: [
          {
            path: '/info/committee',
            component: React.lazy(() => import('../views/Info/Committee/index')),
            meta: {
              title: '组织信息',
              icon: 'read',
            },
          },
          {
            path: '/info/person/:id',
            component: React.lazy(() => import('../views/Info/Person/index')),
            meta: {
              title: '人员信息',
              icon: 'read',
            },
          },
        ],
      },
      {
        path: '/dataManage',
        roles: [ADMIN, USER],
        meta: {
          title: '数据管理',
          icon: 'info',
        },
        redirect: '/dataManage/verify',
        children: [
          {
            path: '/dataManage/verify',
            component: React.lazy(() => import('../views/DataManage/Verify/index')),
            roles: [ADMIN, USER],
            meta: {
              title: '数据校验',
              icon: 'read',
            },
          },
          {
            path: '/dataManage/clean',
            component: React.lazy(() => import('../views/DataManage/Clean/index')),
            roles: [ADMIN, USER],
            meta: {
              title: '数据清理',
              icon: 'read',
            },
          },
          {
            path: '/dataManage/batchUpdate',
            component: React.lazy(() => import('../views/DataManage/BatchUpdate/index')),
            roles: [ADMIN, USER],
            meta: {
              title: '批量修改',
              icon: 'read',
            },
          },
          {
            path: '/dataManage/export',
            component: React.lazy(() => import('../views/DataManage/Export/index')),
            roles: [ADMIN, USER],
            meta: {
              title: '数据导出',
              icon: 'read',
            },
          },
          {
            path: '/dataManage/import',
            component: React.lazy(() => import('../views/DataManage/Import/index')),
            roles: [ADMIN, USER],
            meta: {
              title: '数据导入',
              icon: 'read',
            },
          },
        ],
      },
      {
        path: '/setting',
        roles: [ADMIN, USER],
        meta: {
          title: '系统设置',
          icon: 'setting',
        },
        redirect: '/setting/logger',
        children: [
          {
            path: '/setting/dictionary',
            component: React.lazy(() => import('../views/Setting/Dictionary/index')),
            roles: [ADMIN, USER],
            meta: {
              title: '数据字典',
              icon: 'read',
            },
          },
          {
            path: '/setting/logger',
            component: React.lazy(() => import('../views/Setting/Logger/index')),
            roles: [ADMIN, USER],
            meta: {
              title: '日志',
              icon: 'read',
            },
          },
        ],
      },

      // 以下的路由改动请小心，涉及权限校验模块
      {
        path: '/error',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
        children: [
          {
            path: '/error/404',
            component: React.lazy(() => import('../views/Error/404')),
            meta: {
              title: '页面不存在',
            },
          },
          {
            path: '/error/403',
            component: React.lazy(() => import('../views/Error/403')),
            meta: {
              title: '暂无权限',
            },
          },
        ],
      },
      {
        path: '/*',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
      },
    ],
  },
];

export default routeTree;
