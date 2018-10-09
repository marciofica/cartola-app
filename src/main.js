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
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import VueTheMask from 'vue-the-mask'

import App from './App'

import router from './router'
Vue.router = router

import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

moment.tz.setDefault('Asia/America_SaoPaulo')
Vue.prototype.$moment = moment

// todo
// cssVars()

Vue.use(BootstrapVue)
Vue.use(Toast)

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:8000'

Vue.use(VueTheMask)

Vue.use(VueAuth, {
  auth: {
    request: function (req, token) {
      this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token})
    },
    response: function (res) {
      var token = res.data.access_token
      if (token) {
        token = token.split('Bearer ')
        return token[token.length > 1 ? 1 : 0]
      }
    }
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {url: 'o/token/', method: 'POST', redirect: '/', fetchUser: false},
  logoutData: {url: 'o/revoke_token/', method: 'POST', redirect: '/', makeRequest: true},
  fetchData: {url: 'user/me/', method: 'GET'},
  refreshData: {url: 'user/me/', method: 'GET', atInit: false},
  authRedirect: {path: '/pages/login'},
  tokenStore: ['localStorage', 'cookie']
})

Vue.use(VueMoment, {
  moment,
})

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
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
