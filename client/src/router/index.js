import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Shows from '@/components/Shows'
import NewShow from '@/components/NewShow'
import EditShow from '@/components/EditShow'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
})
