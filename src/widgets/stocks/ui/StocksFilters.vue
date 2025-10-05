<template>
  <div class="stocks-filters">
    <DatePickerLocalized :date-text="dateFrom" title="Дата" disabled />
    <MultipleSelect
      v-model:value="selectedWarehouseNames"
      :disabled="isDisabled"
      :options="warehouseNameOptions"
      title="Склад"
      :width="300"
    />
    <MultipleSelect
      v-model:value="selectedCategories"
      :disabled="isDisabled"
      :options="categoryOptions"
      title="Категория"
      :width="300"
    />
    <Button :disabled="!hasActiveFilters || isLoading" type="primary" @click="clearFilters">
      Очистить фильтры
    </Button>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStocksStore } from '@/widgets/stocks/model/stocks'
import DatePickerLocalized from '@/shared/ui/DatePickerLocalized.vue'
import MultipleSelect from '@/shared/ui/MultipleSelect.vue'
import { Button } from 'ant-design-vue'
import { computed } from 'vue'

const stocksStore = useStocksStore()
const {
  dateFrom,
  stocksData,
  selectedWarehouseNames,
  selectedCategories,
  warehouseNameOptions,
  categoryOptions,
  isLoading,
} = storeToRefs(stocksStore)

const isDisabled = computed(() => {
  return stocksData.value.length === 0 || isLoading.value
})

const hasActiveFilters = computed(() => {
  return selectedWarehouseNames.value.length > 0 || selectedCategories.value.length > 0
})

function clearFilters() {
  selectedWarehouseNames.value = []
  selectedCategories.value = []
}
</script>

<style lang="less" scoped>
.stocks-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: flex-end;
}
</style>
