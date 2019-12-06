import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import state from '../state'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/faq',
    name: 'faq',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FAQ.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { guest: true }, // 游客访问（未登录时才可以进入）
    component: () => import('../views/Login.vue')
  },
  {
    path: '/tickets',
    meta: { private: true }, // 需要权限才可以访问
    component: () => import('../components/TicketsLayout.vue'),
    children: [
      {
        path: '',
        name: 'tickets',
        component: () => import('../components/Tickets.vue')
      },
      {
        path: 'new',
        name: 'new-ticket',
        component: () => import('../components/NewTicket.vue')
      },
      {
        path: ':id',
        name: 'ticket',
        component: () => import('../components/Ticket.vue'),
        props: route => ({ id: route.params.id }) // 动态的根据params.id 放入porps中
      }
    ]

  },
  {
    path: '*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, form, savedPosition) { // history模式时支持页面滚动
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // TODO
  console.log('to', to.name)
  // 判断是否登录
  console.log('to:', to)
  if (to.matched.some(r => r.meta.private) && !state.user) {
    next({
      name: 'login',
      params: {
        wantedRoute: to.fullPath // 目标路由
      }
    })
    return
  }

  if (to.matched.some(r => r.meta.guest) && state.user) {
    next({
      name: 'home'
    })
    return
  }
  next()
})

export default router
