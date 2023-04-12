// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import axios from "axios";
import 'element-ui/lib/theme-chalk/index.css'
import { videoPreUrl } from '@/utils/config.js';
// 全局方法挂载
Vue.prototype.url = videoPreUrl

Vue.config.productionTip = false
Vue.prototype.$env= process.env
Vue.use(Element)
axios.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
