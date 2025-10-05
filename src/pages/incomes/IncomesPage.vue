<template>
  <div class="incomes-page">
    <IncomesFilters class="incomes-page__filters" />
    <IncomesLineChart class="incomes-page__chart" />
    <IncomesTable class="incomes-page__table" />
  </div>
</template>

<script setup lang="ts">
import IncomesFilters from '@/widgets/incomes/ui/IncomesFilters.vue'
import IncomesTable from '@/widgets/incomes/ui/IncomesTable.vue'
import IncomesLineChart from '@/widgets/incomes/ui/IncomesLineChart.vue'
</script>

<style lang="less" scoped>
.incomes-page {
  &__filters,
  &__chart {
    margin-bottom: 16px;
  }
}
</style>
