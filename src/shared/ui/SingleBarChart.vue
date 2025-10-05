<template>
  <div ref="chartContainer" class="single-bar-chart-wrapper">
    <Bar :key="chartKey" class="single-bar-chart" :data="barData" :options="options" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { computed, ref, onMounted, onUnmounted } from 'vue'

export type SingleBarChartProps = {
  dataLables: string[]
  data: number[]
  barsColor?: string
  responsive?: boolean
  title: string
}

const props = withDefaults(defineProps<SingleBarChartProps>(), {
  responsive: true,
  barsColor: '#C4193E',
})

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const sortedData = computed(() => {
  const combined = props.dataLables.map((label, index) => ({
    label,
    value: props.data[index] ?? 0,
  }))

  combined.sort((a, b) => a.label.localeCompare(b.label))

  return {
    labels: combined.map((item) => item.label),
    values: combined.map((item) => item.value),
  }
})

const barData = computed(() => {
  return {
    labels: sortedData.value.labels,
    datasets: [
      {
        data: sortedData.value.values,
        borderColor: props.barsColor,
        backgroundColor: props.barsColor,
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
.single-bar-chart-wrapper {
  width: 100%;
  height: 100%;

  .single-bar-chart {
    max-width: 600px;
    max-height: 300px;
  }
}
</style>
