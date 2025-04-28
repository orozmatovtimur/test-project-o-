import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'  
import CallsTableView from '@/views/CallsTableView.vue'  

const routes = [
  { path: '/login', component: LoginView },
  { path: '/dashboard', component: DashboardView },
  { path: '/analytics', component: CallsTableView },
  { path: '/settings', component: DashboardView }, 
  { path: '/', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
