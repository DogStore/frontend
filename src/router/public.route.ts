// src/router/public.routes.ts
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/user/ProductDetailView.vue'
import ProductListView from '../views/user/ProductDetailView.vue'
import ProductDetailView from '../views/user/ProductDetailView.vue'

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductListView
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetailView
  },
  // Add more public pages: About, Contact, etc.
]

export default publicRoutes
