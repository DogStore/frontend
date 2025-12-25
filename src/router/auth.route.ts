// src/router/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'
import Authenication from '@/views/auth/Authentication.vue'

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Authenication,
    meta: { guestOnly: true },
  },
]

export default authRoutes
