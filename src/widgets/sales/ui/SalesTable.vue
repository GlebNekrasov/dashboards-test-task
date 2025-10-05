<template>
  <div class="sales-table">
    <Table
      v-if="filteredSalesData.length > 0"
      :dataSource="filteredSalesData"
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
import { useSalesStore } from '../model/sales'
import { storeToRefs } from 'pinia'
import type { TableColumnsType } from 'ant-design-vue'
import type { SalesData } from '@/shared/api/sales'

const salesStore = useSalesStore()
const { filteredSalesData, isLoading, isMaxRecordCountExceeded, foundRecordsCount, salesData } =
  storeToRefs(salesStore)

const columns: TableColumnsType<SalesData> = [
  {
    title: 'ID продажи',
    dataIndex: 'sale_id',
    key: 'sale_id',
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
    title: 'Номер заказа',
    dataIndex: 'g_number',
    key: 'g_number',
    width: 150,
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
    title: 'Дата продажи',
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
    title: 'СПП %',
    dataIndex: 'spp',
    key: 'spp',
    width: 80,
  },
  {
    title: 'К оплате',
    dataIndex: 'for_pay',
    key: 'for_pay',
    width: 100,
    customRender: ({ value }) => (value ? parseFloat(value).toFixed(2) : ''),
  },
  {
    title: 'Финальная цена',
    dataIndex: 'finished_price',
    key: 'finished_price',
    width: 100,
    customRender: ({ value }) => (value ? parseFloat(value).toFixed(2) : ''),
  },
  {
    title: 'Цена со скидкой',
    dataIndex: 'price_with_disc',
    key: 'price_with_disc',
    width: 100,
    customRender: ({ value }) => (value ? parseFloat(value).toFixed(2) : ''),
  },
  {
    title: 'Скидка промокода',
    dataIndex: 'promo_code_discount',
    key: 'promo_code_discount',
    width: 100,
  },
  {
    title: 'Склад',
    dataIndex: 'warehouse_name',
    key: 'warehouse_name',
    width: 200,
  },
  {
    title: 'Регион',
    dataIndex: 'region_name',
    key: 'region_name',
    width: 200,
  },
  {
    title: 'Область/Округ',
    dataIndex: 'oblast_okrug_name',
    key: 'oblast_okrug_name',
    width: 250,
  },
  {
    title: 'Страна',
    dataIndex: 'country_name',
    key: 'country_name',
    width: 150,
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
    title: 'Сторно',
    dataIndex: 'is_storno',
    key: 'is_storno',
    width: 80,
    customRender: ({ value }) => (value === null ? '-' : value ? 'Да' : 'Нет'),
  },
  {
    title: 'Последнее изменение',
    dataIndex: 'last_change_date',
    key: 'last_change_date',
    width: 100,
  },
]

function getRowKey(record: SalesData) {
  return `${record.sale_id}-${record.nm_id}-${record.income_id}-${record.odid}-${record.g_number}`
}

function getTotalPagination(total: number) {
  if (isMaxRecordCountExceeded.value) {
    return (
      `Всего найдено ${foundRecordsCount.value} строк за выбранный период, ` +
      `загружено ${salesData.value.length} строк. ` +
      `В таблице показано ${total} строк с учетом фильтрации.`
    )
  }
  return `Всего строк в таблице: ${total}`
}
</script>

<style lang="less" scoped>
.sales-table {
  width: 100%;
}
</style>
