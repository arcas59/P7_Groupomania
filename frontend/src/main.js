import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import lsWatcher from 'vue-storage-watcher'
import { store } from '../store/store';


Vue.use(lsWatcher, { prefix : 'groupomania_'});

//Vuevalidate - Validation des formulaires
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
