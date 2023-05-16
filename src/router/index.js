import { createRouter, createWebHashHistory } from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed.vue'
import Register from '@/views/RegisterPage.vue'
import LoginPage from '@/views/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed
  },
  {
    path: "/register",
    name: 'register',
    component: Register
  },
  {
    path: "/login",
    name: 'login',
    component: LoginPage
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
