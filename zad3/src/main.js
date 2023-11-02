import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import App from './App.vue'

import {createPinia, PiniaVuePlugin} from "pinia";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(PiniaVuePlugin)

Vue.config.productionTip = false

const pinia = createPinia();

new Vue({
  pinia,
  render: h => h(App),
}).$mount('#app')
