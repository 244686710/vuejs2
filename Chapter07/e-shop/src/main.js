import Vue from "vue";
import App from "./components/App.vue";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import { createI18n, getAutoLang } from "./utils/i18n";
import * as filters from "./filters";
import "./plugins";
import "./components";

// Global filters
for (const key in filters) {
  Vue.filter(key, filters[key]);
}

sync(store, router);
async function main() {
  const locale = getAutoLang();

  const i18n = await createI18n(locale);
  await store.dispatch("init");

  new Vue({
    el: "#app",
    router,
    store,
    i18n,
    ...App
  });
}
main();
