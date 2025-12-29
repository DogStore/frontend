// src/router/public.routes.ts
import type { RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/user/ProductPage.vue'
import ProductListPage from '../pages/user/ProductPage.vue'
import ProductDetailPage from '../pages/user/ProductPage.vue'
import SearchResultPage from '@/pages/user/SearchResultPage.vue'
import WishlistPage from '@/pages/user/WishlistPage.vue'

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductListPage,
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetailPage,
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

export default publicRoutes
