import Vue from 'vue'
import Router from 'vue-router'
import api from '@/components/api'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'api',
      component: api
    }
  ]
})
