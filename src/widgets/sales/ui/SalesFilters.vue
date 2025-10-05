<template>
  <div class="sales-filters">
    <DatePickerLocalized v-model:date-text="dateFrom" :disabled="isLoading" title="Дата с" />
    <DatePickerLocalized v-model:date-text="dateTo" :disabled="isLoading" title="Дата до" />
    <MultipleSelect
      v-model:value="selectedWarehouseNames"
      :disabled="isDisabled"
      :options="warehouseNameOptions"
      title="Склад"
      :width="300"
    />
    <MultipleSelect
      v-model:value="selectedRegionNames"
      :disabled="isDisabled"
      :options="regionNameOptions"
      title="Регион"
      :width="300"
    />
    <Button :disabled="!hasActiveFilters || isLoading" type="primary" @click="clearFilters">
      Очистить фильтры
    </Button>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSalesStore } from '@/widgets/sales/model/sales'
import DatePickerLocalized from '@/shared/ui/DatePickerLocalized.vue'
import MultipleSelect from '@/shared/ui/MultipleSelect.vue'
import { Button } from 'ant-design-vue'
import { computed } from 'vue'

const salesStore = useSalesStore()
const {
  dateFrom,
  dateTo,
  salesData,
  selectedWarehouseNames,
  selectedRegionNames,
  warehouseNameOptions,
  regionNameOptions,
  isLoading,
} = storeToRefs(salesStore)

const isDisabled = computed(() => {
  return salesData.value.length === 0 || isLoading.value
})

const hasActiveFilters = computed(() => {
  return (
    dateFrom.value !== '' ||
    dateTo.value !== '' ||
    selectedWarehouseNames.value.length > 0 ||
    selectedRegionNames.value.length > 0
  )
})

function clearFilters() {
  dateFrom.value = ''
  dateTo.value = ''
  selectedWarehouseNames.value = []
  selectedRegionNames.value = []
}
</script>

<style lang="less" scoped>
.sales-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: flex-end;
}
</style>
