/*
 * @Overview:   Router entry file
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 13:20
 * @Mark:       //
 */

import Vue from "vue";
import VueRouter from "vue-router";
import DemoHome from "views/DemoHome.vue";
import { IS_PROD } from "utils/const";

Vue.use(VueRouter);

const routerModules = [];
let routerFiles = IS_PROD
  ? require.context("./modules", false, /^((?!exclude).)*\.js$/)
  : require.context("./modules", false, /\.js$/);
routerFiles.keys().forEach(name => {
  routerModules.push(...routerFiles(name).default);
});

const routes = [
  {
    path: "/",
    name: "DemoHome",
    meta: {
      title: "首页",
      keepAlive: false,
      requireAuth: false
    },
    component: DemoHome
  },
  ...routerModules,
  {
    path: "*",
    name: "NotFound",
    meta: {
      title: "NotFound",
      keepAlive: true,
      requireAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/abnormal/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { x: 0, y: 0 };
  }
});

export default router;
