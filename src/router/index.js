import Vue from 'vue'
import VueRouter from 'vue-router'
import MapPage from '../views/MapPage.vue'
import ForeignListPage from '../views/ForeignListPage.vue'
import TrendPage from '../views/TrendPage.vue'
import RatePage from '../views/RatePage.vue'
import ChinaDayPage from '../views/ChinaDayPage.vue'
import CountPage from '../views/CountPage.vue'
import RegionalRiskPage from '../views/RegionalRiskPage.vue'
import VaccineTopPage from '../views/VaccineTopPage.vue'
import VaccineTrendPage from '../views/VaccineTrendPage.vue'
import CountDown from '../views/CountDown.vue'

import ScreenPage from '../views/ScreenPage.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/screenpage'
  },
  {
    path: '/screenpage',
    component: ScreenPage
  },
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
  },
  {
    path: '/ratepage',
    component: RatePage
  },
  {
    path: '/chinadaypage',
    component: ChinaDayPage
  },
  {
    path: '/countpage',
    component: CountPage
  },
  {
    path: '/regionalriskpage',
    component: RegionalRiskPage
  },
  {
    path: '/vaccinetoppage',
    component: VaccineTopPage
  },
  {
    path: '/vaccinetrendpage',
    component: VaccineTrendPage
  },
  {
    path: '/countdown',
    component: CountDown
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
