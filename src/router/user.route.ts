// src/router/user.route.ts
import UserLayout from '../layouts/UserLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: UserLayout,
    meta: { requiresAuth: true, role: 'user' },
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('@/pages/user/ProfilePage.vue'),
      },
      { path: '', redirect: 'profile' },
    ],
  },
]

export default userRoutes
