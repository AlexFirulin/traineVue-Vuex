import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/RegisterPage.vue'
import LoginPage from '@/views/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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