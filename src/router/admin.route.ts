// src/router/admin.routes.ts
import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '../components/admin/layout/AdminLayout.vue'

// Admin views
import DashboardPageAdmin from '@/pages/admin/DashboardPage.admin.vue'
import ManageProductPageAdmin from '@/pages/admin/MangeProductPage.admin.vue'
import PromotionPageAdmin from '@/pages/admin/PromotionPage.admin.vue'
import ViewOrderPageAdmin from '@/pages/admin/ViewOrderPage.admin.vue'

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
        component: DashboardPageAdmin,
      },
      {
        path: 'Manage-Product',
        name: 'ManageProduct',
        component: ManageProductPageAdmin,
      },
      {
        path: 'Promotion',
        name: 'Promotion',
        component: PromotionPageAdmin,
      },
      {
        path: 'View-Order',
        name: 'View-Order',
        component: ViewOrderPageAdmin,
      },
    ],
  },
]

export default adminRoutes
