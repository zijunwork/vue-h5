/*
 * @Overview:   Test/Demo Page
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 13:55
 * @Mark:       // There are not exist in Production
 */

export default [
  {
    path: "/settings",
    name: "Settings",
    meta: {
      title: "系统设置",
      keepAlive: true,
      requireAuth: false
    },
    component: () => import(/* webpackChunkName: "demo" */ "views/Settings")
  }
];
