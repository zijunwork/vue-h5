import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "首页",
      keepAlive: true
    },
    component: Home
  },
  {
    path: "/about",
    name: "about",
    meta: {
      title: "关于",
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/settings",
    name: "settings",
    meta: {
      title: "设置",
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Settings.vue")
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

router.beforeEach((to, from, next) => {
  !to.meta.t && (to.meta.t = new Date().getTime().toString());
  next();
});

export default router;
