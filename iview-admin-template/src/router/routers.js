import Main from '@/view/main'
import parentView from '@/components/parent-view'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true,
      title:"主页"
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          hideInMenu: true,
          notCache: true,
          title:"主页"
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },


  {
    path: '/info',
    name: 'info',
    meta: {
      icon: 'social-buffer',
      title: '资讯管理'
    },
    component: Main,
    children: [
      {
        path: 'look_info',
        name: 'look_info',
        meta: {
          icon: 'arrow-graph-up-right',
          title: '查看资讯'
        },
        component: () => import('@/view/info/look-info.vue')
      },
      {
        path: 'add_info',
        name: 'add_info',
        meta: {
          icon: 'arrow-graph-up-right',
          title: '新增资讯'
        },
        component: () => import('@/view/text-editor/text-editor.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'arrow-graph-up-right',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'arrow-graph-up-right',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'arrow-graph-up-right',
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'arrow-graph-up-right',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2/level-2-1.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'arrow-graph-up-right',
          title: '二级-3'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_3_1',
            name: 'level_2_3_1',
            meta: {
              access: ['super_admin'],
              icon: 'arrow-graph-up-right',
              title: '三级-1'
            },
            component: () => import('@/view/multilevel/level-2/level-2-1.vue')
          },
          {
            path: 'level_2_3_2',
            name: 'level_2_3_2',
            meta: {
              access: ['super_admin', 'admin'],
              icon: 'arrow-graph-up-right',
              title: '三级-2'
            },
            component: () => import('@/view/multilevel/level-2/level-2-1.vue')
          }
        ]
      }
    ]
  },
  {
    path: 'error-feedback',
    name: 'error-feedback',
    meta: {
      icon: 'arrow-graph-up-right',
      title: '错误与反馈'
    },
    component: Main,
    children: [
      {
        path: 'error-feedback',
        name: 'error-feedback',
        component: parentView,
        meta: {
          access: ['super_admin', 'admin'],
          icon: 'arrow-graph-up-right',
          title: '错误信息'
        },
        component: () => import('@/view/error-feedback/error-feedback.vue')
      },
      {
        path: 'error-feedback1',
        name: 'error-feedback1',
        meta: {
          access: ['super_admin', 'admin'],
          icon: 'arrow-graph-up-right',
          title: '用户反馈'
        },
        component: () => import('@/view/error-feedback/error-feedback.vue')
      }
    ]
 
  },

  {
    path: '/401',
    name: 'error_401',
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    component: () => import('@/view/error-page/404.vue')
  }
]
