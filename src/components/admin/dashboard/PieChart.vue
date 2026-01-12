<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-2">Total Product Listed Analyst</h3>
    <apexchart
      type="pie"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// Alias the component for template use
const apexchart = VueApexCharts as any;

// Pie Chart Data (Mock Data for now)
const series = ref([900, 300, 500, 200]); // Food, Clothes, Bags, Others
const labels = ['Food', 'Clothes', 'Bags', 'Others'];

const chartOptions = computed(() => ({
  chart: {
    type: 'pie',
  },
  labels: labels,
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
  // Use Tailwind colors here (optional)
  // colors: ['#f97316', '#ef4444', '#10b981', '#6366f1'],
}));

// In a real app, you'd fetch this data from a service
// import { getPieChartData } from '@/services/chartService.ts';
// onMounted(async () => {
//   const data = await getPieChartData();
//   series.value = data.series;
//   labels.value = data.labels;
// });
</script>
