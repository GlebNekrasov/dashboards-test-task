<template>
  <div class="stocks-warehouses-chart">
    <SingleBarChart
      v-if="filteredStocksData.length > 0"
      :data="dataWarehouses"
      :data-lables="warehouses"
      title="Количество остатков по складам"
      key="bar1"
    />
  </div>
</template>

<script setup lang="ts">
import SingleBarChart from '@/shared/ui/SingleBarChart.vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useStocksStore } from '@/widgets/stocks/model/stocks'

const stocksStore = useStocksStore()
const { filteredStocksData } = storeToRefs(stocksStore)

const warehouses = computed(() => {
  const warehouseMap = new Map<string, number>()

  filteredStocksData.value.forEach((stock) => {
    const current = warehouseMap.get(stock.warehouse_name) || 0
    warehouseMap.set(stock.warehouse_name, current + stock.quantity)
  })

  return Array.from(warehouseMap.keys())
})

const dataWarehouses = computed(() => {
  const warehouseMap = new Map<string, number>()

  filteredStocksData.value.forEach((stock) => {
    const current = warehouseMap.get(stock.warehouse_name) || 0
    warehouseMap.set(stock.warehouse_name, current + stock.quantity)
  })

  return Array.from(warehouseMap.values())
})
</script>
