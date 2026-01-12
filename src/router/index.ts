// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes from './admin.route'
import userRoutes from './user.route'
import authRoutes from './auth.route'
import publicRoutes from './public.route'
import { useUserStore } from '../stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...authRoutes, ...adminRoutes, ...userRoutes],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = !!userStore.token
  const userRole = userStore.role

  // Guest-only routes (e.g., /login)
  if (to.meta.guestOnly && isLoggedIn) {
    next(userRole === 'admin' ? '/admin/dashboard' : '/user/profile')
    return
  }

  // Auth-required routes
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
    return
  }

  // Role check
  if (to.meta.role && to.meta.role !== userRole) {
    next('/')
    return
  }

  next()
})

export default router
