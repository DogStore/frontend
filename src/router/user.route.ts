// src/router/user.route.ts
import UserLayout from '../layouts/UserLayout.vue'
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
        component: () => import('@/pages/user/ProfilePage.vue'),
      },
      { path: '', redirect: 'profile' },
      {
        path: "aboutUs",
        name: "aboutUs",
        component: () => import("@/pages/user/AboutUs.vue"),
      },
    ],
  },
]

export default userRoutes
