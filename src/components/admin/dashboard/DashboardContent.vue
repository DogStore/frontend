<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-center text-gray-900">DASHBOARD</h1>
    </div>

    <!-- Loading State -->
    <div v-if="dashboardStore.loading" class="space-y-6">
      <!-- Stats Cards Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="rounded-xl p-6 bg-gray-200 animate-pulse h-32"></div>
      </div>

      <!-- Charts Skeleton -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="i in 4" :key="i" class="bg-white rounded-xl p-6 h-80 animate-pulse">
          <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div class="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="dashboardStore.error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Failed to load dashboard</h3>
      <p class="text-red-600 mb-4">{{ dashboardStore.error }}</p>
      <button
        @click="dashboardStore.fetchDashboardData()"
        class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
      >
        Try Again
      </button>
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Registered Users"
          :value="dashboardStore.stats.totalUsers"
          :lastUpdate="formattedLastUpdate"
          color="orange"
          icon="users"
        />
        <StatsCard
          title="Total Product Listed"
          :value="dashboardStore.stats.totalProducts"
          :lastUpdate="formattedLastUpdate"
          color="blue"
          icon="products"
        />
        <StatsCard
          title="Total Sales Revenue"
          :value="dashboardStore.stats.totalRevenue"
          :lastUpdate="formattedLastUpdate"
          color="yellow"
          icon="revenue"
          prefix="$"
        />
        <StatsCard
          title="Total Products Sold"
          :value="dashboardStore.stats.totalOrders"
          :lastUpdate="formattedLastUpdate"
          color="green"
          icon="sold"
          :fullWidth="true"
        />
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Line Chart - Users -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-2">Total Register Users Analyst</h2>
          <p class="text-sm text-gray-500 mb-4">
            The graph showing about the Register Users growth over time
          </p>
          <LineChart :data="userChartData" />
        </div>

        <!-- Bar Chart - Products Sale -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-2">Total Products Sale Analyst</h2>
          <p class="text-sm text-gray-500 mb-4">
            The graph showing about daily sales in the last 30 days
          </p>
          <BarChart :data="productSaleData" />
        </div>

        <!-- Pie Chart - Products Listed -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-2">Total Product Listed Analyst</h2>
          <p class="text-sm text-gray-500 mb-4">
            The graph showing about products sold by category
          </p>
          <PieChart :data="categoryChartData" />
        </div>

        <!-- Line Chart - Revenue -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-2">Total Sales Revenue Analyst</h2>
          <p class="text-sm text-gray-500 mb-4">
            The graph showing about revenue trends in the last 30 days
          </p>
          <LineChart :data="revenueChartData" :color="'#FBBF24'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAdminDashboardStore } from '@/stores/adminDashboardStore'
import StatsCard from './StatsCard.vue'
import LineChart from './LineChart.vue'
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'

const dashboardStore = useAdminDashboardStore()

// Format last update time
const formattedLastUpdate = computed(() => {
  if (!dashboardStore.lastUpdated) return ''
  const date = new Date(dashboardStore.lastUpdated)
  return date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
})

// User growth chart data
const userChartData = computed(() => {
  const growth = dashboardStore.userGrowth

  // Get last 6 months
  const last6Months = growth.slice(-6)

  return {
    labels: last6Months.map(item => {
      const date = new Date(item._id + '-01')
      return date.toLocaleDateString('en-US', { month: 'long' })
    }),
    values: last6Months.map(item => item.count)
  }
})

// Product sales chart data (last 30 days, grouped by week or shown as daily)
const productSaleData = computed(() => {
  const sales = dashboardStore.salesData

  // Show last 7 days for better visualization
  const last7Days = sales.slice(-7)

  return {
    labels: last7Days.map(item => {
      const date = new Date(item._id)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }),
    values: last7Days.map(item => item.orders),
    colors: ['#3B82F6', '#FB923C', '#FBBF24', '#60A5FA', '#FB923C', '#FBBF24', '#3B82F6']
  }
})

// Category distribution pie chart
const categoryChartData = computed(() => {
  const categories = dashboardStore.categoryStats

  return {
    labels: categories.map(cat => cat._id),
    values: categories.map(cat => cat.totalSold),
    colors: ['#3B82F6', '#FB923C', '#84CC16', '#22C55E', '#F59E0B', '#8B5CF6']
  }
})

// Revenue chart data
const revenueChartData = computed(() => {
  const sales = dashboardStore.salesData

  // Show all 30 days or group by week
  const last30Days = sales.slice(-30)

  return {
    labels: last30Days.map(item => {
      const date = new Date(item._id)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }),
    values: last30Days.map(item => item.dailyRevenue)
  }
})

// Fetch data on mount
onMounted(() => {
  dashboardStore.fetchDashboardData()
})
</script>
