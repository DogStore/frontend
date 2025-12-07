import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
<<<<<<< HEAD
  routes: [
    {
      path: '/',
      name: 'cart',
      component: () => import('@/pages/CartPage.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/pages/CheckoutPage.vue'),
    }
  ],
=======
  routes: [],
>>>>>>> 2b29b782e69cd48e621f336f0362e602e53a7291
})

export default router
