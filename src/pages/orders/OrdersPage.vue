<template>
  <div class="orders-page">
    <OrdersFilters class="orders-page__filters" />
    <OrdersLineChart class="orders-page__chart" />
    <OrdersTable class="orders-page__table" />
  </div>
</template>

<script setup lang="ts">
import OrdersFilters from '@/widgets/orders/ui/OrdersFilters.vue'
import OrdersTable from '@/widgets/orders/ui/OrdersTable.vue'
import OrdersLineChart from '@/widgets/orders/ui/OrdersLineChart.vue'
</script>

<style lang="less" scoped>
.orders-page {
  &__filters,
  &__chart {
    margin-bottom: 16px;
  }
}
</style>
