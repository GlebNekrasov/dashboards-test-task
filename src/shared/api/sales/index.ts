import { request } from '@/shared/lib/request'
import type { MetaResponseApi } from '@/shared/api/types'

export type SalesData = {
  g_number: string
  date: string
  last_change_date: string
  supplier_article: string
  tech_size: string
  barcode: number
  total_price: string
  discount_percent: string
  is_supply: boolean
  is_realization: boolean
  promo_code_discount: string | null
  warehouse_name: string
  country_name: string
  oblast_okrug_name: string
  region_name: string
  income_id: number
  sale_id: string
  odid: string | null
  spp: string
  for_pay: string
  finished_price: string
  price_with_disc: string
  nm_id: number
  subject: string
  category: string
  brand: string
  is_storno: boolean | null
}

export type GetSalesRequest = {
  dateFrom: string
  dateTo: string
  page?: number
  limit?: number
}

export type GetSalesResponse = {
  data: SalesData[]
  meta: MetaResponseApi
}

export function getSalesApi(params: GetSalesRequest): Promise<GetSalesResponse> {
  return request({
    url: `/sales`,
    method: 'get',
    params,
  })
}
