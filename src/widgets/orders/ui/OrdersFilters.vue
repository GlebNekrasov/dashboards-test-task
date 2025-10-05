<template>
  <div class="orders-filters">
    <DatePickerLocalized v-model:date-text="dateFrom" :disabled="isLoading" title="Дата с" />
    <DatePickerLocalized v-model:date-text="dateTo" :disabled="isLoading" title="Дата до" />
    <MultipleSelect
      v-model:value="selectedOblasts"
      :disabled="isDisabled"
      :options="oblastOptions"
      title="Область"
      :width="300"
    />
    <MultipleSelect
      v-model:value="selectedWarehouseNames"
      :disabled="isDisabled"
      :options="warehouseNameOptions"
      title="Склад"
      :width="300"
    />
    <Button :disabled="!hasActiveFilters || isLoading" type="primary" @click="clearFilters">
      Очистить фильтры
    </Button>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOrdersStore } from '@/widgets/orders/model/orders'
import DatePickerLocalized from '@/shared/ui/DatePickerLocalized.vue'
import MultipleSelect from '@/shared/ui/MultipleSelect.vue'
import { Button } from 'ant-design-vue'
import { computed } from 'vue'

const ordersStore = useOrdersStore()
const {
  dateFrom,
  dateTo,
  ordersData,
  selectedOblasts,
  selectedWarehouseNames,
  oblastOptions,
  warehouseNameOptions,
  isLoading,
} = storeToRefs(ordersStore)

const isDisabled = computed(() => {
  return ordersData.value.length === 0 || isLoading.value
})

const hasActiveFilters = computed(() => {
  return (
    dateFrom.value !== '' ||
    dateTo.value !== '' ||
    selectedOblasts.value.length > 0 ||
    selectedWarehouseNames.value.length > 0
  )
})

function clearFilters() {
  dateFrom.value = ''
  dateTo.value = ''
  selectedOblasts.value = []
  selectedWarehouseNames.value = []
}
</script>

<style lang="less" scoped>
.orders-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: flex-end;
}
</style>
