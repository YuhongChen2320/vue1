import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/page/HelloWorld'
import Layout from '@/page/layout'
import Centre from '@/page/centre'
import order from '@/page/order'
import User from '@/page/User'
import User_1 from '@/page/User_1'
import User_2 from '@/page/User_2'
import User_3 from '@/page/User_3'
import Couriers from '@/page/Couriers'
import Couriers_1 from '@/page/Couriers_1'
import Couriers_2 from '@/page/Couriers_2'
import Couriers_3 from '@/page/Couriers_3'
import Couriers_4 from '@/page/Couriers_4'
import registered from '@/page/registered'
import manage from '@/page/manage'

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
      path: '/registered',
      name: 'registered',
      component: registered
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout,
      children: [{
        path: '/manage',
        name: 'manage',
        component: manage
      }, {
        path: '/order',
        name: 'order',
        component: order
      },
    ]
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      children: [{
        path: '/user_1',
        name: 'user_1',
        component: User_1
      }, {
        path: '/user_2',
        name: 'user_2',
        component: User_2
      },{
        path: '/user_3',
        name: 'user_3',
        component: User_3
      }]
    },
    {
      path: '/Couriers',
      name: 'Couriers',
      component: Couriers,
      children: [{
        path: '/Couriers_1',
        name: 'Couriers_1',
        component: Couriers_1
      }, {
        path: '/Couriers_2',
        name: 'Couriers_2',
        component: Couriers_2
      },{
        path: '/Couriers_3',
        name: 'Couriers_3',
        component: Couriers_3
      },{
        path: '/Couriers_4',
        name: 'Couriers_4',
        component: Couriers_4
      }]
    }
  ]
})
