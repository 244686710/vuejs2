import Vue from 'vue'
import VueFetch, { $fetch } from './plugins/fetch'
import VueState from './plugins/state'
import * as filters from './filters'

import './global.components'
import App from './App.vue'
import router from './router'
import store from './store'
import state from './state'

// 循环注册
for (const key in filters) {
  Vue.filter(key, filters[key])
}

Vue.use(VueFetch, {
  baseUrl: 'http://localhost:3000/'
})
Vue.use(VueState, state)

Vue.config.productionTip = false

async function main () {
  // 获取用户信息
  try {
    state.user = await $fetch('user')
  } catch (e) {
    console.warn(e)
  }
  // 启动应用
  new Vue({
    router,
    store,
    data: state,
    render: h => h(App)
  }).$mount('#app')
}

main()
