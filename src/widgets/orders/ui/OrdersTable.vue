<template>
  <div class="orders-table">
    <Table
      v-if="filteredOrdersData.length > 0"
      :dataSource="filteredOrdersData"
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
import { useOrdersStore } from '../model/orders'
import { storeToRefs } from 'pinia'
import type { TableColumnsType } from 'ant-design-vue'
import type { OrdersData } from '@/shared/api/orders'

const ordersStore = useOrdersStore()
const { filteredOrdersData, isLoading, isMaxRecordCountExceeded, foundRecordsCount, ordersData } =
  storeToRefs(ordersStore)

const columns: TableColumnsType<OrdersData> = [
  {
    title: 'Номер заказа',
    dataIndex: 'g_number',
    key: 'g_number',
    width: 150,
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
    title: 'ID дохода',
    dataIndex: 'income_id',
    key: 'income_id',
    width: 100,
  },
  {
    title: 'ODID',
    dataIndex: 'odid',
    key: 'odid',
    width: 100,
  },
  {
    title: 'Дата заказа',
    dataIndex: 'date',
    key: 'date',
    width: 150,
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
    title: 'Итоговая цена',
    dataIndex: 'total_price',
    key: 'total_price',
    width: 100,
    customRender: ({ value }) => (value ? parseFloat(value).toFixed(2) : ''),
  },
  {
    title: 'Скидка %',
    dataIndex: 'discount_percent',
    key: 'discount_percent',
    width: 80,
  },
  {
    title: 'Склад',
    dataIndex: 'warehouse_name',
    key: 'warehouse_name',
    width: 200,
  },
  {
    title: 'Область',
    dataIndex: 'oblast',
    key: 'oblast',
    width: 250,
  },
  {
    title: 'Бренд',
    dataIndex: 'brand',
    key: 'brand',
    width: 150,
  },
  {
    title: 'Предмет',
    dataIndex: 'subject',
    key: 'subject',
    width: 150,
  },
  {
    title: 'Категория',
    dataIndex: 'category',
    key: 'category',
    width: 150,
  },
  {
    title: 'Отменен',
    dataIndex: 'is_cancel',
    key: 'is_cancel',
    width: 80,
    customRender: ({ value }) => (value ? 'Да' : 'Нет'),
  },
  {
    title: 'Дата отмены',
    dataIndex: 'cancel_dt',
    key: 'cancel_dt',
    width: 100,
  },
  {
    title: 'Последнее изменение',
    dataIndex: 'last_change_date',
    key: 'last_change_date',
    width: 100,
  },
]

function getRowKey(record: OrdersData) {
  return `${record.g_number}-${record.nm_id}-${record.income_id}-${record.odid}`
}

function getTotalPagination(total: number) {
  if (isMaxRecordCountExceeded.value) {
    return (
      `Всего найдено ${foundRecordsCount.value} строк за выбранный период, ` +
      `загружено ${ordersData.value.length} строк. ` +
      `В таблице показано ${total} строк с учетом фильтрации.`
    )
  }
  return `Всего строк в таблице: ${total}`
}
</script>

<style lang="less" scoped>
.orders-table {
  width: 100%;
}
</style>
