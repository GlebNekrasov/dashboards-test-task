import { request } from '@/shared/lib/request'
import type { MetaResponseApi } from '@/shared/api/types'

export type OrdersData = {
  g_number: string
  date: string
  last_change_date: string
  supplier_article: string
  tech_size: string
  barcode: number
  total_price: string
  discount_percent: number
  warehouse_name: string
  oblast: string
  income_id: number
  odid: string
  nm_id: number
  subject: string
  category: string
  brand: string
  is_cancel: boolean
  cancel_dt: string | null
}

export type GetOrdersRequest = {
  dateFrom: string
  dateTo: string
  page?: number
  limit?: number
}

export type GetOrdersResponse = {
  data: OrdersData[]
  meta: MetaResponseApi
}

export function getOrdersApi(params: GetOrdersRequest): Promise<GetOrdersResponse> {
  return request({
    url: `/orders`,
    method: 'get',
    params,
  })
}
