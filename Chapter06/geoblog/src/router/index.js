import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/GeoBolg.vue";
// import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { private: true }
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Login.vue")
  },
  {
    path: "*",
    component: () => import("../views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  // console.log("to", to.name);
  // const user = store.getters.user;
  // if (to.matched.some(r => r.meta.private) && !user) {
  //   next({
  //     name: "login",
  //     params: {
  //       wantedRoute: to.fullPath
  //     }
  //   });
  //   return;
  // }
  // if (to.matched.some(r => r.meta.guest) && user) {
  //   next({ name: "home" });
  //   return;
  // }
  next();
});

export default router;
