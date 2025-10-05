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
        showTotal: (total) => `Всего: ${total}`,
        position: ['topRight'],
        showSizeChanger: false,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { Table } from 'ant-design-vue'
import { useIncomesStore } from './model/incomes'
import { storeToRefs } from 'pinia'
import type { TableColumnsType } from 'ant-design-vue'
import type { IncomeData } from '@/shared/api/incomes'

const incomesStore = useIncomesStore()
const { filteredIncomesData, isLoading } = storeToRefs(incomesStore)

const columns: TableColumnsType<IncomeData> = [
  {
    title: 'NM ID',
    dataIndex: 'nm_id',
    key: 'nm_id',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'ID дохода',
    dataIndex: 'income_id',
    key: 'income_id',
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

function getRowKey(record: IncomeData) {
  return `${record.nm_id}-${record.income_id}`
}
</script>

<style lang="less" scoped>
.incomes-table {
  width: 100%;
}
</style>
