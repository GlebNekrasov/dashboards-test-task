<template>
  <div class="orders-line-chart">
    <SingleLinePeriodChart
      v-if="filteredOrdersData.length > 0 && dateFrom && dateTo"
      :start-date="dateFrom"
      :end-date="dateTo"
      :data="dateData"
      title="Сумма заказов по датам"
      key="line1"
    />
  </div>
</template>

<script setup lang="ts">
import SingleLinePeriodChart from '@/shared/ui/SingleLinePeriodChart.vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrdersStore } from '@/widgets/orders/model/orders'

const ordersStore = useOrdersStore()
const { filteredOrdersData, dateFrom, dateTo } = storeToRefs(ordersStore)

const dateData = computed(() => {
  const dateMap = new Map<string, number>()

  filteredOrdersData.value.forEach((order) => {
    const date = order.date.split(' ')[0]! // Извлекаем дату в формате YYYY-MM-DD
    const current = dateMap.get(date) || 0
    dateMap.set(date, current + parseFloat(order.total_price))
  })

  return Array.from(dateMap.entries()).map(([date, value]) => ({
    date,
    value,
  }))
})
</script>
