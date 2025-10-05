import type { SalesData } from '@/shared/api/sales'
import { getSalesApi } from '@/shared/api/sales'
import { MAX_RECORDS_COUNT } from '@/shared/lib/request'
import { notification } from 'ant-design-vue'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useSalesStore = defineStore('sales', () => {
  const isLoading = ref(false)
  const dateFrom = ref<string>('')
  const dateTo = ref<string>('')
  const foundRecordsCount = ref<number>(0)
  const maxRecordsCount = MAX_RECORDS_COUNT
  const isMaxRecordCountExceeded = computed(() => {
    return foundRecordsCount.value >= MAX_RECORDS_COUNT
  })
  const salesData = ref<SalesData[]>([])
  const filteredSalesData = computed(() => {
    return salesData.value.filter((sale) => {
      if (
        selectedWarehouseNames.value.length > 0 &&
        !selectedWarehouseNames.value.includes(sale.warehouse_name)
      ) {
        return false
      }
      if (
        selectedRegionNames.value.length > 0 &&
        !selectedRegionNames.value.includes(sale.region_name)
      ) {
        return false
      }
      return true
    })
  })
  const selectedWarehouseNames = ref<SalesData['warehouse_name'][]>([])
  const selectedRegionNames = ref<SalesData['region_name'][]>([])

  const warehouseNameOptions = computed(() => {
    // Фильтруем только по regionName, чтобы показать доступные склады
    const filtered = salesData.value.filter((sale) => {
      if (
        selectedRegionNames.value.length > 0 &&
        !selectedRegionNames.value.includes(sale.region_name)
      ) {
        return false
      }
      return true
    })
    return [...new Set(filtered.map((sale) => sale.warehouse_name))]
  })
  const regionNameOptions = computed(() => {
    // Фильтруем только по warehouseName, чтобы показать доступные регионы
    const filtered = salesData.value.filter((sale) => {
      if (
        selectedWarehouseNames.value.length > 0 &&
        !selectedWarehouseNames.value.includes(sale.warehouse_name)
      ) {
        return false
      }
      return true
    })
    return [...new Set(filtered.map((sale) => sale.region_name))]
  })

  function clearStore() {
    salesData.value = []
    selectedWarehouseNames.value = []
    selectedRegionNames.value = []
    foundRecordsCount.value = 0
  }

  async function getSalesByPage(page: number = 1, limit: number = 500) {
    const response = await getSalesApi({
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

  async function getSalesData() {
    let isLastPage = false
    let currentPage = 1
    salesData.value = []
    foundRecordsCount.value = 0

    while (!isLastPage && salesData.value.length < maxRecordsCount) {
      try {
        isLoading.value = true
        const response = await getSalesByPage(currentPage)
        foundRecordsCount.value = response.meta.total
        salesData.value.push(...response.data)
        if (currentPage === response.meta.last_page) {
          isLastPage = true
        }
        currentPage++
      } catch {
        notification.error({
          message: 'Не получилось загрузить данные о продажах',
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
        getSalesData()
      } else {
        clearStore()
      }
    },
  )

  return {
    dateFrom,
    dateTo,
    filteredSalesData,
    foundRecordsCount,
    salesData,
    isLoading,
    isMaxRecordCountExceeded,
    maxRecordsCount,
    selectedWarehouseNames,
    selectedRegionNames,
    warehouseNameOptions,
    regionNameOptions,
    getSalesData,
  }
})
