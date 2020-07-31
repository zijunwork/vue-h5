/*
 * @Overview:   Abnormal routes
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 14:03
 * @Mark:       e.g. 404/101...
 */

export default [
  {
    path: "/404",
    name: "404",
    meta: {
      title: "NotFound",
      keepAlive: false,
      showNavBar: true,
      requireAuth: false,
      index: 100
    },
    component: () =>
      import(/* webpackChunkName: "common" */ "../../views/abnormal/404.vue")
  }
];
