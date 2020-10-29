import Vue from 'vue'
import store from './store'
import Root from './Root.vue'
import vuetify from './plugins/vuetify';
import router from './router'


Vue.config.productionTip = false


new Vue({
  router,
  vuetify,
  store,
  render: h => h(Root)
}).$mount('#app')
