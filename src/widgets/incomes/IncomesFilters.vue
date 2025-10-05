<template>
  <div class="incomes-filters">
    <DatePickerLocalized v-model:date-text="dateFrom" title="Дата с" />
    <DatePickerLocalized v-model:date-text="dateTo" title="Дата до" />
    <MultipleSelect
      v-model:value="selectedSupplierArticle"
      :disabled="isDisabled"
      :options="supplierArticleOptions"
      title="Артикул поставщика"
      :width="300"
    />
    <MultipleSelect
      v-model:value="selectedWarehouseName"
      :disabled="isDisabled"
      :options="warehouseNameOptions"
      title="Склад"
      :width="300"
    />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useIncomesStore } from '@/widgets/incomes/model/incomes'
import DatePickerLocalized from '@/shared/ui/DatePickerLocalized.vue'
import MultipleSelect from '@/shared/ui/MultipleSelect.vue'
import { computed } from 'vue'

const incomesStore = useIncomesStore()
const {
  dateFrom,
  dateTo,
  incomesData,
  selectedSupplierArticle,
  selectedWarehouseName,
  supplierArticleOptions,
  warehouseNameOptions,
} = storeToRefs(incomesStore)

const isDisabled = computed(() => {
  return incomesData.value.length === 0
})
</script>

<style lang="less" scoped>
.incomes-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
