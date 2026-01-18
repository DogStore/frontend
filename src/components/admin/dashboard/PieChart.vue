<template>
  <div class="relative h-64 flex items-center justify-center">
    <canvas ref="chartCanvas"></canvas>

    <!-- Legend -->
    <div class="absolute top-0 right-0 space-y-2">
      <div
        v-for="(label, index) in data.labels"
        :key="index"
        class="flex items-center gap-2 text-sm"
      >
        <div
          class="w-4 h-4 rounded"
          :style="{ backgroundColor: data.colors[index] }"
        ></div>
        <span class="text-gray-700">{{ label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps<{
  data: {
    labels: string[]
    values: number[]
    colors: string[]
  }
}>()

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const createChart = () => {
  if (!chartCanvas.value) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'pie',
    data: {
      labels: props.data.labels,
      datasets: [{
        data: props.data.values,
        backgroundColor: props.data.colors,
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#1F2937',
          padding: 12,
          borderRadius: 8,
          titleColor: '#fff',
          bodyColor: '#fff',
          callbacks: {
            label: function(context: { label: string; parsed: number; dataset: { data: any[]; }; }) {
              const label = context.label || ''
              const value = context.parsed || 0
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
              const percentage = ((value / total) * 100).toFixed(1)
              return `${label}: ${value} (${percentage}%)`
            }
          }
        }
      }
    }
  })
}

onMounted(() => {
  createChart()
})

watch(() => props.data, () => {
  createChart()
}, { deep: true })
</script>
