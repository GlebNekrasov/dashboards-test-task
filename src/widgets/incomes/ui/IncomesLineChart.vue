<template>
  <div class="incomes-line-chart">
    <SingleLinePeriodChart
      v-if="filteredIncomesData.length > 0 && dateFrom && dateTo"
      :start-date="dateFrom"
      :end-date="dateTo"
      :data="dateData"
      title="Количество по датам"
      key="line1"
    />
  </div>
</template>

<script setup lang="ts">
import SingleLinePeriodChart from '@/shared/ui/SingleLinePeriodChart.vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useIncomesStore } from '@/widgets/incomes/model/incomes'

const incomesStore = useIncomesStore()
const { filteredIncomesData, dateFrom, dateTo } = storeToRefs(incomesStore)

const dateData = computed(() => {
  const dateMap = new Map<string, number>()

  filteredIncomesData.value.forEach((income) => {
    const date = income.date
    const current = dateMap.get(date) || 0
    dateMap.set(date, current + income.quantity)
  })

  return Array.from(dateMap.entries()).map(([date, value]) => ({
    date,
    value,
  }))
})
</script>
