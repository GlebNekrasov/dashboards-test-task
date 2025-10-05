<template>
  <div class="sales-line-chart">
    <SingleLinePeriodChart
      v-if="filteredSalesData.length > 0 && dateFrom && dateTo"
      :start-date="dateFrom"
      :end-date="dateTo"
      :data="dateData"
      title="Сумма продаж по датам"
      key="line1"
    />
  </div>
</template>

<script setup lang="ts">
import SingleLinePeriodChart from '@/shared/ui/SingleLinePeriodChart.vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSalesStore } from '@/widgets/sales/model/sales'

const salesStore = useSalesStore()
const { filteredSalesData, dateFrom, dateTo } = storeToRefs(salesStore)

const dateData = computed(() => {
  const dateMap = new Map<string, number>()

  filteredSalesData.value.forEach((sale) => {
    const date = sale.date
    const current = dateMap.get(date) || 0
    dateMap.set(date, current + parseFloat(sale.total_price))
  })

  return Array.from(dateMap.entries()).map(([date, value]) => ({
    date,
    value,
  }))
})
</script>
