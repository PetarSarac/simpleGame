import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUi from 'element-ui'

Vue.use(ElementUi)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
