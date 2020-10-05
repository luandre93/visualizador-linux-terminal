import Vue from 'vue'
import VueRouter from 'vue-router'
import app from '@/App'
import pMain from '../components/Main.vue'
import pCommands from '../components/Commands.vue'
//import pLogin from '@/views/login.vue'

Vue.use(VueRouter)

const routes = [
  //{ path: '/login', name: 'Login', component: pLogin },
  {
    path: '/app',
    name: 'app',
    component: app,
    children: [
      {
        path: '/Main',
        name: 'pMain',
        component: pMain
      }, {
        path: '/Commands',
        name: 'pCommands',
        component: pCommands
      }
    ]
  },
  { path: '/', redirect: '/Main' }

]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
