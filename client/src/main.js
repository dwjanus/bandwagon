// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import SuiVue from 'semantic-ui-vue'
import moment from 'vue-moment'
import App from './App'
import router from './router'
import '../semantic/dist/semantic.min.css'


Vue.config.productionTip = false

Vue.use(SuiVue)
Vue.use(moment)


/* eslint-disable */
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
