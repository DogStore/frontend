// src/router/public.routes.ts
import type { RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/user/HomePage.vue'
import SearchResultPage from '@/pages/user/SearchResultPage.vue'
import WishlistPage from '@/pages/user/WishlistPage.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'HomePage',
        component: HomePage,
      },
      {
        path: '/search',
        name: 'Search',
        component: SearchResultPage,
      },
      {
        path: '/wishlist',
        name: 'wishlist',
        component: WishlistPage,
      },
    // {
    //   path: "/cart",
    //   name: "cart",
    //   component: () => import("@/pages/CartPage.vue"),
    // },
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

    ]
  },


]

export default publicRoutes
