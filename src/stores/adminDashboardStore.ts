import { defineStore } from 'pinia'
import { ref } from 'vue'
import { adminApi } from '@/services/api'

interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalUsers: number
  totalProducts: number
}

interface SalesData {
  _id: string
  dailyRevenue: number
  orders: number
}

interface UserGrowth {
  _id: string
  count: number
}

interface CategoryStat {
  _id: string
  totalSold: number
  revenue: number
}

export const useAdminDashboardStore = defineStore('adminDashboard', () => {
  // State
  const stats = ref<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0
  })

  const salesData = ref<SalesData[]>([])
  const userGrowth = ref<UserGrowth[]>([])
  const categoryStats = ref<CategoryStat[]>([])
  const productsSold = ref(0)

  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastUpdated = ref<string>('')

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    loading.value = true
    error.value = null

    try {
      const [statsRes, salesRes, usersRes, productsRes] = await Promise.all([
        adminApi.get('/admin/dashboard/stats'),
        adminApi.get('/admin/dashboard/sales'),
        adminApi.get('/admin/dashboard/users'),
        adminApi.get('/admin/dashboard/products')
      ])

      // Stats
      stats.value = statsRes.data.stats
      lastUpdated.value = statsRes.data.lastUpdated

      // Sales
      salesData.value = salesRes.data.sales

      // Users
      userGrowth.value = usersRes.data.users.growth

      // Products
      categoryStats.value = productsRes.data.products.categoryStats

      // Calculate total products sold from orders
      productsSold.value = salesRes.data.sales.reduce(
        (sum: number, day: SalesData) => sum + day.orders,
        0
      )

    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch dashboard data'
      console.error('Dashboard fetch error:', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch individual endpoints
  const fetchStats = async () => {
    try {
      const res = await adminApi.get('/admin/dashboard/stats')
      stats.value = res.data.stats
      lastUpdated.value = res.data.lastUpdated
    } catch (err: any) {
      console.error('Failed to fetch stats:', err)
    }
  }

  const fetchSales = async () => {
    try {
      const res = await adminApi.get('/admin/dashboard/sales')
      salesData.value = res.data.sales
    } catch (err: any) {
      console.error('Failed to fetch sales:', err)
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await adminApi.get('/admin/dashboard/users')
      userGrowth.value = res.data.users.growth
    } catch (err: any) {
      console.error('Failed to fetch users:', err)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await adminApi.get('/admin/dashboard/products')
      categoryStats.value = res.data.products.categoryStats
    } catch (err: any) {
      console.error('Failed to fetch products:', err)
    }
  }

  return {
    // State
    stats,
    salesData,
    userGrowth,
    categoryStats,
    productsSold,
    loading,
    error,
    lastUpdated,

    // Actions
    fetchDashboardData,
    fetchStats,
    fetchSales,
    fetchUsers,
    fetchProducts
  }
})
