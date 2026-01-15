// src/router/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'
import Authenication from '@/pages/auth/Authentication.vue'

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Authenication,
   children: [
      {
        path: '',
        name: 'login/register',
        component: Authenication,
        meta: {guestOnly: true},
    }
   ]
  },
]

export default authRoutes
