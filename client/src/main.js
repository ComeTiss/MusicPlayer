// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

Vue.use(Vuetify)
sync(store, router)

Vue.filter('numbers', (value) => {
  // Puts a number in format NN
  let number = value + 1
  if (number < 10) {
    return '0' + number + '.'
  }
  return number + '.'
})

Vue.filter('minutes', (value) => {
  // Puts a duration in format: MM:SS
  if (!value || typeof value !== 'number') return '00:00'
  let min = parseInt(value / (60 * 1000))
  let sec = parseInt(value % 60)
  min = min < 10 ? '0' + min : min
  sec = sec < 10 ? '0' + sec : sec
  value = min + ':' + sec
  return value
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
