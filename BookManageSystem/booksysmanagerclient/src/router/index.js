import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/regist',
      name: 'regist',
      component: resolve => require(['@/components/Regist.vue'],resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/Login.vue'],resolve)
    },
      {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: resolve => require(['@/components/forgetPwd.vue'],resolve)
    }
  ]
})
