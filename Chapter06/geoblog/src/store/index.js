import Vue from "vue";
import Vuex from "vuex";
import { $fetch } from "../plugins/fetch";
import router from "../router/index";
import maps from "./maps";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production" ? true : false, // 避免在mutation中使用异步调用，开启严格模式, 开启严格模式后，state只可以通过mutation去修改
  state() {
    return {
      user: null
    };
  },
  getters: {
    user: state => state.user,
    userPicture: (state, getters) => {
      const user = getters.user;
      if (user) {
        const photos = user.profile.photos;
        if (photos.length !== 0) {
          return photos[0].value;
        }
      }
    }
  },
  mutations: {
    user: (state, user) => {
      state.user = user;
    }
  },
  actions: {
    async login({ commit }) {
      try {
        const user = await $fetch("user");
        commit("user", user);
        if (user) {
          // 重定向到对应的路由，或返回首页
          router.replace(
            router.currentRoute.params.wantedRoute || { name: "home" }
          );
        }
      } catch (e) {
        console.warn(e);
      }
    },
    logout({ commit }) {
      commit("user", null);
      $fetch("logout");
      // 如果这个路由是私有的我们就跳转到登录页面
      if (router.currentRoute.matched.some(r => r.meta.private)) {
        router.replace({
          name: "login",
          params: {
            wantedRoute: router.currentRoute.fullPath
          }
        });
      }
    },
    async init({ dispatch }) {
      await dispatch("login");
    }
  },
  modules: {
    maps
  }
});
