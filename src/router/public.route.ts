// src/router/public.routes.ts
import type { RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/user/HomePage.vue'
import SearchResultPage from '@/pages/user/SearchResultPage.vue'
import WishlistPage from '@/pages/user/WishlistPage.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import CategoryPage from '@/pages/user/CategoryPage.vue'
import ProductDetail from '@/pages/user/ProductDetailPage.vue'
import Bestsellingpage from '@/pages/user/BestsellingPage.vue'
import CartPage from '@/pages/user/CartPage.vue'
import CheckoutPage from '@/pages/user/CheckoutPage.vue'
import OrderSuccess from '@/pages/user/OrderSuccess.vue'

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
      {
        path: '/category/:slug?',
        name: 'Category',
        component: CategoryPage,
      },
      {
        path: '/product/:slug',
        name: 'ProductDetail',
        component: ProductDetail,
      },
      {
        path: '/products/bestSelling',
        name: 'bestSelling',
        component: Bestsellingpage,
      },
      {
        path: "/cart",
        name: "cart",
        component: CartPage,
      },
      {
        path: "/Checkout",
        name: "checkout",
        component: CheckoutPage,
      },
      {
        path: '/order-success',
        name: 'OrderSuccess',
        component: OrderSuccess,
      }
    ]
  },
]

export default publicRoutes
