/*
 * @Overview:   Test/Demo Page
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 13:55
 * @Mark:       // There are not exist in Production
 */
import i18n from "@/lang/index";

console.log(i18n);

export default [
  {
    path: "/settings",
    name: "Settings",
    meta: {
      title: i18n.t("route.title.name"),
      keepAlive: true,
      showNavBar: true,
      requireAuth: false
    },
    component: () => import(/* webpackChunkName: "demo" */ "views/Settings")
  }
];
