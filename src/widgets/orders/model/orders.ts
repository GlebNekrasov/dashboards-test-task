import type { OrdersData } from '@/shared/api/orders'
import { getOrdersApi } from '@/shared/api/orders'
import { MAX_RECORDS_COUNT } from '@/shared/lib/request'
import { notification } from 'ant-design-vue'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  const isLoading = ref(false)
  const dateFrom = ref<string>('')
  const dateTo = ref<string>('')
  const foundRecordsCount = ref<number>(0)
  const maxRecordsCount = MAX_RECORDS_COUNT
  const isMaxRecordCountExceeded = computed(() => {
    return foundRecordsCount.value >= maxRecordsCount
  })
  const ordersData = ref<OrdersData[]>([])
  const filteredOrdersData = computed(() => {
    return ordersData.value.filter((order) => {
      if (selectedOblasts.value.length > 0 && !selectedOblasts.value.includes(order.oblast)) {
        return false
      }
      if (
        selectedWarehouseNames.value.length > 0 &&
        !selectedWarehouseNames.value.includes(order.warehouse_name)
      ) {
        return false
      }
      return true
    })
  })
  const selectedOblasts = ref<OrdersData['oblast'][]>([])
  const selectedWarehouseNames = ref<OrdersData['warehouse_name'][]>([])

  const warehouseNameOptions = computed(() => {
    // Фильтруем только по oblast, чтобы показать доступные склады
    const filtered = ordersData.value.filter((order) => {
      if (selectedOblasts.value.length > 0 && !selectedOblasts.value.includes(order.oblast)) {
        return false
      }
      return true
    })
    return [...new Set(filtered.map((order) => order.warehouse_name))]
  })
  const oblastOptions = computed(() => {
    // Фильтруем только по warehouseName, чтобы показать доступные области
    const filtered = ordersData.value.filter((order) => {
      if (
        selectedWarehouseNames.value.length > 0 &&
        !selectedWarehouseNames.value.includes(order.warehouse_name)
      ) {
        return false
      }
      return true
    })
    return [...new Set(filtered.map((order) => order.oblast))]
  })

  function clearStore() {
    ordersData.value = []
    selectedOblasts.value = []
    selectedWarehouseNames.value = []
    foundRecordsCount.value = 0
  }

  async function getOrdersByPage(page: number = 1, limit: number = 500) {
    const response = await getOrdersApi({
      dateFrom: dateFrom.value,
      dateTo: dateTo.value,
      page,
      limit,
    })

    return {
      data: response.data,
      meta: response.meta,
    }
  }

  async function getOrdersData() {
    let isLastPage = false
    let currentPage = 1
    ordersData.value = []
    foundRecordsCount.value = 0

    while (!isLastPage && ordersData.value.length < maxRecordsCount) {
      try {
        isLoading.value = true
        const response = await getOrdersByPage(currentPage)
        foundRecordsCount.value = response.meta.total
        ordersData.value.push(...response.data)
        if (currentPage === response.meta.last_page) {
          isLastPage = true
        }
        currentPage++
      } catch {
        notification.error({
          message: 'Не получилось загрузить данные о заказах',
        })
        clearStore()
      } finally {
        isLoading.value = false
      }
    }

    if (foundRecordsCount.value >= maxRecordsCount) {
      notification.warning({
        message: `Превышен лимит ${maxRecordsCount} по количеству записей в одном запросе.`,
      })
    }
  }

  watch(
    () => [dateFrom.value, dateTo.value],
    () => {
      if (dateFrom.value && dateTo.value) {
        getOrdersData()
      } else {
        clearStore()
      }
    },
  )

  return {
    dateFrom,
    dateTo,
    filteredOrdersData,
    foundRecordsCount,
    isLoading,
    isMaxRecordCountExceeded,
    maxRecordsCount,
    oblastOptions,
    ordersData,
    selectedOblasts,
    selectedWarehouseNames,
    warehouseNameOptions,
    getOrdersData,
  }
})
