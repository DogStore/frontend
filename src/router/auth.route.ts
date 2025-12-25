// src/router/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { guestOnly: true },
  },
  // {
  //   path: '/',
  //   redirect: () => {
  //     const role = localStorage.getItem('userRole')
  //     if (role === 'admin') return { path: '/admin/dashboard' }
  //     if (role === 'user') return { path: '/user/profile' }
  //     return { path: '/login' }
  //   },
  // },
]

export default authRoutes
