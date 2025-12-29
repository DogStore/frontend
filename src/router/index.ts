import HomePage from '@/pages/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/pages/CheckoutPage.vue'),
    },
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
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/pages/CartPage.vue"),
    },
    // {
    //   path: "/products/foods",
    //   name: "foods",
    //   component: () => import("@/pages/ProductsByCategory.vue"),
    // },
    // {
    //   path: "/products/clothes",
    //   name: "clothes",
    //   component: () => import("@/pages/ProductsByCategory.vue"),
    // },
    // {
    //   path: "/products/toys",
    //   name: "toys",
    //   component: () => import("@/pages/ProductsByCategory.vue"),
    // },
    // {
    //   path: "/products/others",
    //   name: "others",
    //   component: () => import("@/pages/ProductsByCategory.vue"),
    // },
    // {
    //   path: "/products/bestSelling",
    //   name: "bestSelling",
    //   component: () => import("@/pages/BestSellingPage.vue"),
    // },
  ],
})

export default router
