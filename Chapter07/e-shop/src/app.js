import Vue from "vue";
import App from "./components/App.vue";
import createRouter from "./router";
import createStore from "./store";
import { sync } from "vuex-router-sync";
import { createI18n } from "./utils/i18n";
import * as filters from "./filters";
import "./plugins";
import "./components";

// Global filters
for (const key in filters) {
  Vue.filter(key, filters[key]);
}

export async function createApp(context) {
  const store = createStore();
  const router = createRouter();

  sync(store, router);

  const i18n = await createI18n(context.locale);
  await store.dispatch("init");

  const app = new Vue({
    router,
    store,
    i18n,
    ...App
  });

  return {
    app,
    router,
    store
  };
}
