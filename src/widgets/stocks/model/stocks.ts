import type { StocksData } from '@/shared/api/stocks'
import { getStocksApi } from '@/shared/api/stocks'
import { notification } from 'ant-design-vue'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useStocksStore = defineStore('stocks', () => {
  const isLoading = ref(false)
  const dateFrom = ref(new Date().toISOString().split('T')[0])
  const foundRecordsCount = ref(0)
  const stocksData = ref<StocksData[]>([])
  const filteredStocksData = computed(() => {
    return stocksData.value.filter((stock) => {
      if (
        selectedCategories.value.length > 0 &&
        !selectedCategories.value.includes(stock.category)
      ) {
        return false
      }
      if (
        selectedWarehouseNames.value.length > 0 &&
        !selectedWarehouseNames.value.includes(stock.warehouse_name)
      ) {
        return false
      }
      return true
    })
  })
  const selectedCategories = ref<StocksData['category'][]>([])
  const selectedWarehouseNames = ref<StocksData['warehouse_name'][]>([])

  const warehouseNameOptions = computed(() => {
    const filtered = stocksData.value.filter((stock) => {
      if (
        selectedCategories.value.length > 0 &&
        !selectedCategories.value.includes(stock.category)
      ) {
        return false
      }
      return true
    })
    return [...new Set(filtered.map((stock) => stock.warehouse_name))]
  })
  const categoryOptions = computed(() => {
    const filtered = stocksData.value.filter((stock) => {
      if (
        selectedWarehouseNames.value.length > 0 &&
        !selectedWarehouseNames.value.includes(stock.warehouse_name)
      ) {
        return false
      }
      return true
    })
    return [...new Set(filtered.map((stock) => stock.category))]
  })

  function clearStore() {
    stocksData.value = []
    selectedCategories.value = []
    selectedWarehouseNames.value = []
    foundRecordsCount.value = 0
  }

  async function getStocksByPage(page: number = 1, limit: number = 500) {
    const response = await getStocksApi({
      dateFrom: dateFrom.value!,
      page,
      limit,
    })

    return {
      data: response.data,
      meta: response.meta,
    }
  }

  async function getStocksData() {
    let isLastPage = false
    let currentPage = 1
    stocksData.value = []
    foundRecordsCount.value = 0
    dateFrom.value = new Date().toISOString().split('T')[0]

    while (!isLastPage) {
      try {
        isLoading.value = true
        const response = await getStocksByPage(currentPage)
        foundRecordsCount.value = response.meta.total
        stocksData.value.push(...response.data)
        if (currentPage === response.meta.last_page) {
          isLastPage = true
        }
        currentPage++
      } catch {
        notification.error({
          message: 'Не получилось загрузить данные об остатках',
        })
        clearStore()
      } finally {
        isLoading.value = false
      }
    }
  }

  getStocksData()

  return {
    dateFrom,
    filteredStocksData,
    foundRecordsCount,
    isLoading,
    categoryOptions,
    stocksData,
    selectedCategories,
    selectedWarehouseNames,
    warehouseNameOptions,
    getStocksData,
  }
})
