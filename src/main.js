import Vue from 'vue'
import Root from './Root.vue'
import vuetify from './plugins/vuetify';
import router from './router'
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(Root)
}).$mount('#app')
