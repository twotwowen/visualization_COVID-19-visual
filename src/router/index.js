import Vue from 'vue'
import VueRouter from 'vue-router'
import MapPage from '../views/MapPage.vue'
import ForeignListPage from '../views/ForeignListPage.vue'
import TrendPage from '../views/TrendPage.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/mappage',
    component: MapPage
  },
  {
    path: '/foreignlistpage',
    component: ForeignListPage
  },
  {
    path: '/trendpage',
    component: TrendPage
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
