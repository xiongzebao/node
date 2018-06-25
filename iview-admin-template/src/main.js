// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import 'iview/dist/styles/iview.css'
import env from '../config/env'
console.log(env)
// if (env === 'development')
require('@/mock')
//Vue.use(iView)
Vue.use(iView, {
  i18n: function(path, options) {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) {
      return value
    }
    return ''
  }
})
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
