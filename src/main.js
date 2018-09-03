// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'

// todo
// cssVars()

Vue.use(BootstrapVue)
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:8000'

Vue.router = router

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    console.log('Requer login!!')
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
