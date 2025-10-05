<template>
  <div class="sales-page">
    <SalesFilters class="sales-page__filters" />
    <SalesLineChart class="sales-page__chart" />
    <SalesTable class="sales-page__table" />
  </div>
</template>

<script setup lang="ts">
import SalesFilters from '@/widgets/sales/ui/SalesFilters.vue'
import SalesTable from '@/widgets/sales/ui/SalesTable.vue'
import SalesLineChart from '@/widgets/sales/ui/SalesLineChart.vue'
</script>

<style lang="less" scoped>
.sales-page {
  &__filters,
  &__chart {
    margin-bottom: 16px;
  }
}
</style>
