<template>
  <div class="stocks-table">
    <Table
      v-if="filteredStocksData.length > 0"
      :dataSource="filteredStocksData"
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
import { useStocksStore } from '../model/stocks'
import { storeToRefs } from 'pinia'
import type { TableColumnsType } from 'ant-design-vue'
import type { StocksData } from '@/shared/api/stocks'

const stocksStore = useStocksStore()
const { filteredStocksData, isLoading } = storeToRefs(stocksStore)

const columns: TableColumnsType<StocksData> = [
  {
    title: 'NM ID',
    dataIndex: 'nm_id',
    key: 'nm_id',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Дата',
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
    title: 'Количество',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 100,
  },
  {
    title: 'Полное количество',
    dataIndex: 'quantity_full',
    key: 'quantity_full',
    width: 100,
  },
  {
    title: 'В пути к клиенту',
    dataIndex: 'in_way_to_client',
    key: 'in_way_to_client',
    width: 100,
  },
  {
    title: 'В пути от клиента',
    dataIndex: 'in_way_from_client',
    key: 'in_way_from_client',
    width: 100,
  },
  {
    title: 'Склад',
    dataIndex: 'warehouse_name',
    key: 'warehouse_name',
    width: 200,
  },
  {
    title: 'Категория',
    dataIndex: 'category',
    key: 'category',
    width: 150,
  },
  {
    title: 'Предмет',
    dataIndex: 'subject',
    key: 'subject',
    width: 150,
  },
  {
    title: 'Бренд',
    dataIndex: 'brand',
    key: 'brand',
    width: 150,
  },
  {
    title: 'Код SC',
    dataIndex: 'sc_code',
    key: 'sc_code',
    width: 100,
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    width: 100,
    customRender: ({ value }) => (value ? parseFloat(value).toFixed(2) : ''),
  },
  {
    title: 'Скидка',
    dataIndex: 'discount',
    key: 'discount',
    width: 100,
    customRender: ({ value }) => (value ? parseFloat(value).toFixed(2) : ''),
  },
  {
    title: 'Поставка',
    dataIndex: 'is_supply',
    key: 'is_supply',
    width: 80,
    customRender: ({ value }) => (value ? 'Да' : 'Нет'),
  },
  {
    title: 'Реализация',
    dataIndex: 'is_realization',
    key: 'is_realization',
    width: 100,
    customRender: ({ value }) => (value ? 'Да' : 'Нет'),
  },
  {
    title: 'Последнее изменение',
    dataIndex: 'last_change_date',
    key: 'last_change_date',
    width: 100,
  },
]

function getRowKey(record: StocksData) {
  return `${record.nm_id}-${record.barcode}-${record.sc_code}-${record.warehouse_name}`
}

function getTotalPagination(total: number) {
  return `Всего строк в таблице: ${total}`
}
</script>

<style lang="less" scoped>
.stocks-table {
  width: 100%;
}
</style>
