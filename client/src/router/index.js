import Vue from 'vue'
import Router from 'vue-router'
import Shows from '@/components/Shows'
import NewShow from '@/components/NewShow'
import EditShow from '@/components/EditShow'
import Home from '@/components/Home'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home', redirect: '/'
  },
  {
    path: '/shows',
    name: 'Shows',
    component: Shows
  },
  {
    path: '/shows/new',
    name: 'NewShow',
    component: NewShow
  },
  {
    path: '/shows/:id/edit',
    name: 'EditShow',
    component: EditShow
  }
]

const router = new Router({
  mode: 'history',
  routes,
  linkExactActiveClass: 'active'
})

export default router

