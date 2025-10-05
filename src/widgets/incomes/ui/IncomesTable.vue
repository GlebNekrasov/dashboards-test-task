<template>
  <div class="incomes-table">
    <Table
      v-if="filteredIncomesData.length > 0"
      :dataSource="filteredIncomesData"
      :columns="columns"
      :loading="isLoading"
      :rowKey="(record) => getRowKey(record)"
      :scroll="{ x: 'max-content' }"
      size="small"
      sticky
      :pagination="{
        pageSize: 50,
        showTotal: (total) => getTotalPagination(total),
        position: ['topRight'],
        showSizeChanger: false,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { Table } from 'ant-design-vue'
import { useIncomesStore } from '../model/incomes'
import { storeToRefs } from 'pinia'
import type { TableColumnsType } from 'ant-design-vue'
import type { IncomesData } from '@/shared/api/incomes'

const incomesStore = useIncomesStore()
const { filteredIncomesData, isLoading, isMaxRecordCountExceeded, foundRecordsCount, incomesData } =
  storeToRefs(incomesStore)

const columns: TableColumnsType<IncomesData> = [
  {
    title: 'ID дохода',
    dataIndex: 'income_id',
    key: 'income_id',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'NM ID',
    dataIndex: 'nm_id',
    key: 'nm_id',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Дата дохода',
    dataIndex: 'date',
    key: 'date',
    width: 100,
  },
  {
    title: 'Артикул поставщика',
    dataIndex: 'supplier_article',
    key: 'supplier_article',
    width: 150,
  },
  {
    title: 'Размер',
    dataIndex: 'tech_size',
    key: 'tech_size',
    width: 150,
  },
  {
    title: 'Штрихкод',
    dataIndex: 'barcode',
    key: 'barcode',
    width: 100,
  },
  {
    title: 'Кол-во',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 80,
  },
  {
    title: 'Итоговая цена',
    dataIndex: 'total_price',
    key: 'total_price',
    width: 100,
  },
  {
    title: 'Дата закрытия',
    dataIndex: 'date_close',
    key: 'date_close',
    width: 100,
  },
  {
    title: 'Склад',
    dataIndex: 'warehouse_name',
    key: 'warehouse_name',
    width: 200,
  },
  {
    title: 'Последнее изменение',
    dataIndex: 'last_change_date',
    key: 'last_change_date',
    width: 100,
  },
]

function getRowKey(record: IncomesData) {
  return `${record.nm_id}-${record.income_id}-${record.supplier_article}-${record.warehouse_name}`
}

function getTotalPagination(total: number) {
  if (isMaxRecordCountExceeded.value) {
    return (
      `Всего найдено ${foundRecordsCount.value} строк за выбранный период, ` +
      `загружено ${incomesData.value.length} строк. ` +
      `В таблице показано ${total} строк с учетом фильтрации.`
    )
  }
  return `Всего строк в таблице: ${total}`
}
</script>

<style lang="less" scoped>
.incomes-table {
  width: 100%;
}
</style>
