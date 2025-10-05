<template>
  <div class="incomes-page">
    <IncomesFilters class="incomes-page__filters" />
    <IncomesTable class="incomes-page__table" />
  </div>
</template>

<script setup lang="ts">
import IncomesFilters from '@/widgets/incomes/IncomesFilters.vue'
import IncomesTable from '@/widgets/incomes/IncomesTable.vue'
</script>

<style lang="less" scoped>
.incomes-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
