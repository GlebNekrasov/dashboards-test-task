<template>
  <div class="stocks-page">
    <StocksFilters class="stocks-page__filters" />
    <StocksWarehousesBarChart class="stocks-page__chart" />
    <StocksTable class="stocks-page__table" />
  </div>
</template>

<script setup lang="ts">
import StocksFilters from '@/widgets/stocks/ui/StocksFilters.vue'
import StocksTable from '@/widgets/stocks/ui/StocksTable.vue'
import StocksWarehousesBarChart from '@/widgets/stocks/ui/StocksWarehousesBarChart.vue'
</script>

<style lang="less" scoped>
.stocks-page {
  &__filters,
  &__chart {
    margin-bottom: 16px;
  }
}
</style>
