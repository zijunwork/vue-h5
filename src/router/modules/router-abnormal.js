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
    name: "NotFound",
    meta: {
      title: "NotFound",
      keepAlive: true,
      showNavBar: true,
      requireAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "error" */ "../../views/abnormal/404.vue")
  }
];
