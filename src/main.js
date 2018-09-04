// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth'

import App from './App'

import router from './router'
Vue.router = router

// todo
// cssVars()

Vue.use(BootstrapVue)

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:8000'

Vue.use(BootstrapVue)

Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/basic.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {url: 'o/token/', method: 'POST', redirect: '/', fetchUser: false},
  fetchData: {url: 'user/me/', method: 'GET'},
  refreshData: {url: 'o/token/', method: 'GET', atInit: false},
  authRedirect: {path: '/pages/login'},
  tokenName: 'token'
})


Vue.router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if(!localStorage.getItem('token')) {
      next('/pages/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
