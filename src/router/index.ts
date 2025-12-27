import HomePage from '@/pages/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/",
      name: "Home",
      component: HomePage
    },
    {
      path: "/search",
      name: "Search",
      component: () => import("@/pages/SearchResultPage.vue"),
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: () => import("@/pages/WhishlistPage.vue"),
    },
  ],
})

export default router
