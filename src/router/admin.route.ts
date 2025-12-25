// src/router/admin.routes.ts
import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '../components/admin/layout/AdminLayout.vue'

// Admin views
import DashboardViewAdmin from '@/views/admin/DashboardView.admin.vue'
import ManageProductViewAdmin from '@/views/admin/MangeProductView.admin.vue' // keep name if intentional
import PromotionViewAdmin from '@/views/admin/PromotionView.admin.vue'
import ViewOrderViewAdmin from '@/views/admin/ViewOrderView.admin.vue'

const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: '',
        redirect: 'dashboard',
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: DashboardViewAdmin,
      },
      {
        path: 'Manage-Product',
        name: 'ManageProduct',
        component: ManageProductViewAdmin,
      },
      {
        path: 'Promotion',
        name: 'Promotion',
        component: PromotionViewAdmin,
      },
      {
        path: 'View-Order',
        name: 'View-Order',
        component: ViewOrderViewAdmin,
      },
    ],
  },
]

export default adminRoutes
