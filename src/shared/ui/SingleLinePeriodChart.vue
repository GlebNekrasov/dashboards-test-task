<template>
  <div ref="chartContainer" class="single-line-period-chart-wrapper">
    <Line :key="chartKey" class="single-line-period-chart" :data="lineData" :options="options" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { computed, ref, onMounted, onUnmounted } from 'vue'

export type SingleLinePeriodChartProps = {
  startDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
  data: { date: string; value: number }[]
  lineColor?: string
  responsive?: boolean
  title: string
}

const props = withDefaults(defineProps<SingleLinePeriodChartProps>(), {
  responsive: true,
  lineColor: '#C4193E',
})

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

function generateDateRange(start: string, end: string): string[] {
  const dates: string[] = []
  const startDate = new Date(start)
  const endDate = new Date(end)

  const current = new Date(startDate)
  while (current <= endDate) {
    dates.push(current.toISOString().split('T')[0]!)
    current.setDate(current.getDate() + 1)
  }

  return dates
}

const periodData = computed(() => {
  const dateLabels = generateDateRange(props.startDate, props.endDate)
  const dataMap = new Map(props.data.map((item) => [item.date, item.value]))

  const values = dateLabels.map((date) => dataMap.get(date) ?? 0)

  return {
    labels: dateLabels,
    values,
  }
})

const lineData = computed(() => {
  return {
    labels: periodData.value.labels,
    datasets: [
      {
        data: periodData.value.values,
        borderColor: props.lineColor,
        backgroundColor: props.lineColor,
        tension: 0.4, // Сглаживание линии
        fill: false,
      },
    ],
  }
})

const options = computed(() => {
  return {
    responsive: props.responsive,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90,
        },
      },
    },
  }
})

const chartContainer = ref<HTMLElement | null>(null)
const chartKey = ref(0)

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (chartContainer.value) {
    resizeObserver = new ResizeObserver(() => {
      chartKey.value++
    })
    resizeObserver.observe(chartContainer.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<style lang="less" scoped>
.single-line-period-chart-wrapper {
  width: 100%;
  height: 100%;

  .single-line-period-chart {
    max-width: 600px;
    max-height: 300px;
  }
}
</style>
