import Vue from 'vue'
import VueFetch from './plugins/fetch'
import VueState from './plugins/state'

import './global.components'
import App from './App.vue'
import router from './router'
import store from './store'
import state from './state'

Vue.use(VueFetch, {
  baseUrl: 'http://localhost:3000/'
})
Vue.use(VueState, state)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  data: state,
  render: h => h(App)
}).$mount('#app')
