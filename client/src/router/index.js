import Vue from 'vue'
import Router from 'vue-router'
import Shows from '@/components/Shows'
import NewShow from '@/components/NewShow'
import EditShow from '@/components/EditShow'

Vue.use(Router)

const routes = [{
  path: '/',
  name: 'Home',
  component: Shows
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
  path: '/shows/:id',
  name: 'EditShow',
  component: EditShow
}]

const router = new Router({
  mode: 'history',
  routes
})

export default router

