// src/router/user.route.ts
import UserLayout from '@/components/user/UserLayout.vue'
import TestUser from '@/views/user/TestUser.vue'
import type { RouteRecordRaw } from 'vue-router'

const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: UserLayout,
    meta: { requiresAuth: true, role: 'user' },
    // src/router/user.routes.ts
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('@/views/user/TestUser.vue'),
      },
      { path: '', redirect: 'profile' },
    ],
  },
]

export default userRoutes
