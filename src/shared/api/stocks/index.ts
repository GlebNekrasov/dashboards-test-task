import { request } from '@/shared/lib/request'
import type { MetaResponseApi } from '@/shared/api/types'

export type StocksData = {
  date: string
  last_change_date: string
  supplier_article: string
  tech_size: string
  barcode: number
  quantity: number
  is_supply: boolean
  is_realization: boolean
  quantity_full: number
  warehouse_name: string
  in_way_to_client: number
  in_way_from_client: number
  nm_id: number
  subject: string
  category: string
  brand: string
  sc_code: number
  price: string
  discount: string
}

export type GetStocksRequest = {
  dateFrom: string
  page?: number
  limit?: number
}

export type GetStocksResponse = {
  data: StocksData[]
  meta: MetaResponseApi
}

export function getStocksApi(params: GetStocksRequest): Promise<GetStocksResponse> {
  return request({
    url: `/stocks`,
    method: 'get',
    params,
  })
}
