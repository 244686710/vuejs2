import Vue from "vue";
import VueFetch from "./plugins/fetch";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as filters from "./filters";

// 过滤器
for (const key in filters) {
  Vue.filter(key, filters[key]);
}

Vue.use(VueFetch, {
  baseUrl: "http://localhost:3000/"
});
Vue.config.productionTip = false;

async function main() {
  await store.dispatch("init");

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}

main();
