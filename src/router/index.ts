import { createRouter, createWebHistory } from 'vue-router'
import CategoryPage from '@/views/CategoryPage.vue'
import ProductDetail from '@/views/ProductDetailPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/category',
      name: 'Category',
      component: CategoryPage,
    },
    {
      path: "/product/:id",
      name: "ProductDetail",
      component: ProductDetail
    }
  ],
})

export default router
