import Vue from 'vue'
import App from './App.vue'
// @ts-ignore
import router from './router/index'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import { firestorePlugin } from "vuefire";

Vue.config.productionTip = false
Vue.use(firestorePlugin)

new Vue({
  // @ts-ignore
  router,
  store,
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount('#app')
