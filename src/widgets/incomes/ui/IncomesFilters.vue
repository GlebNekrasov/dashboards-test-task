<template>
  <div class="incomes-filters">
    <DatePickerLocalized v-model:date-text="dateFrom" :disabled="isLoading" title="Дата с" />
    <DatePickerLocalized v-model:date-text="dateTo" :disabled="isLoading" title="Дата до" />
    <MultipleSelect
      v-model:value="selectedSupplierArticles"
      :disabled="isDisabled"
      :options="supplierArticleOptions"
      title="Артикул поставщика"
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
import { useIncomesStore } from '@/widgets/incomes/model/incomes'
import DatePickerLocalized from '@/shared/ui/DatePickerLocalized.vue'
import MultipleSelect from '@/shared/ui/MultipleSelect.vue'
import { Button } from 'ant-design-vue'
import { computed } from 'vue'

const incomesStore = useIncomesStore()
const {
  dateFrom,
  dateTo,
  incomesData,
  selectedSupplierArticles,
  selectedWarehouseNames,
  supplierArticleOptions,
  warehouseNameOptions,
  isLoading,
} = storeToRefs(incomesStore)

const isDisabled = computed(() => {
  return incomesData.value.length === 0 || isLoading.value
})

const hasActiveFilters = computed(() => {
  return (
    dateFrom.value !== '' ||
    dateTo.value !== '' ||
    selectedSupplierArticles.value.length > 0 ||
    selectedWarehouseNames.value.length > 0
  )
})

function clearFilters() {
  dateFrom.value = ''
  dateTo.value = ''
  selectedSupplierArticles.value = []
  selectedWarehouseNames.value = []
}
</script>

<style lang="less" scoped>
.incomes-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: flex-end;
}
</style>
