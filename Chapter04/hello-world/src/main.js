import Vue from 'vue'
import App from './App'
import router from './router/index'

Vue.config.productionTip = false

new Vue({
  ...App,
  router
}).$mount('#app')
