import { request } from '@/shared/lib/request'
import type { MetaResponseApi } from '@/shared/api/types'

export type IncomeData = {
  income_id: number
  number: string
  date: string
  last_change_date: string
  supplier_article: string
  tech_size: string
  barcode: number
  quantity: number
  total_price: string
  date_close: string
  warehouse_name: string
  nm_id: number
}

export type GetIncomeRequest = {
  dateFrom: string
  dateTo: string
  page?: number
  limit?: number
}

export type GetIncomeResponse = {
  data: IncomeData[]
  meta: MetaResponseApi
}

export function getIncomesApi(params: GetIncomeRequest): Promise<GetIncomeResponse> {
  return request({
    url: `/incomes`,
    method: 'get',
    params,
  })
}
