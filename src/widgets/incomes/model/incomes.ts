import type { IncomeData } from '@/shared/api/incomes'
import { getIncomesApi } from '@/shared/api/incomes'
import { notification } from 'ant-design-vue'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useIncomesStore = defineStore('incomes', () => {
  const isLoading = ref(false)
  const dateFrom = ref<string>('')
  const dateTo = ref<string>('')
  const incomesData = ref<IncomeData[]>([])
  const filteredIncomesData = computed(() => {
    return incomesData.value.filter((income) => {
      if (
        selectedSupplierArticle.value.length > 0 &&
        !selectedSupplierArticle.value.includes(income.supplier_article)
      ) {
        return false
      }
      if (
        selectedWarehouseName.value.length > 0 &&
        !selectedWarehouseName.value.includes(income.warehouse_name)
      ) {
        return false
      }
      return true
    })
  })
  const selectedSupplierArticle = ref<IncomeData['supplier_article'][]>([])
  const selectedWarehouseName = ref<IncomeData['warehouse_name'][]>([])

  const warehouseNameOptions = computed(() => {
    // Фильтруем только по supplierArticle, чтобы показать доступные склады
    const filtered = incomesData.value.filter((income) => {
      if (
        selectedSupplierArticle.value.length > 0 &&
        !selectedSupplierArticle.value.includes(income.supplier_article)
      ) {
        return false
      }
      return true
    })
    return [...new Set(filtered.map((income) => income.warehouse_name))]
  })
  const supplierArticleOptions = computed(() => {
    // Фильтруем только по warehouseName, чтобы показать доступные артикулы поставщиков
    const filtered = incomesData.value.filter((income) => {
      if (
        selectedWarehouseName.value.length > 0 &&
        !selectedWarehouseName.value.includes(income.warehouse_name)
      ) {
        return false
      }
      return true
    })
    return [...new Set(filtered.map((income) => income.supplier_article))]
  })

  function clearStore() {
    incomesData.value = []
    selectedSupplierArticle.value = []
    selectedWarehouseName.value = []
  }

  async function getIncomesByPage(page: number = 1, limit: number = 500) {
    const response = await getIncomesApi({
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

  async function getIncomesData() {
    let isLastPage = false
    let currentPage = 1
    incomesData.value = []

    while (!isLastPage) {
      try {
        isLoading.value = true
        const response = await getIncomesByPage(currentPage)
        incomesData.value.push(...response.data)
        if (currentPage === response.meta.last_page) {
          isLastPage = true
        }
        currentPage++
      } catch {
        notification.error({
          message: 'Не получилось загрузить данные о доходах',
        })
        incomesData.value = []
      } finally {
        isLoading.value = false
      }
    }
  }

  watch(
    () => [dateFrom.value, dateTo.value],
    () => {
      if (dateFrom.value && dateTo.value) {
        getIncomesData()
      } else {
        clearStore()
      }
    },
  )

  return {
    dateFrom,
    dateTo,
    filteredIncomesData,
    incomesData,
    isLoading,
    selectedSupplierArticle,
    selectedWarehouseName,
    supplierArticleOptions,
    warehouseNameOptions,
    getIncomesData,
  }
})
