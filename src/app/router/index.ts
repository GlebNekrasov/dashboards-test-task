import { createRouter, createWebHistory } from 'vue-router'

export const INCOME_ROUTE_NAME = 'incomes'
export const ORDERS_ROUTE_NAME = 'orders'
export const SALES_ROUTE_NAME = 'sales'
export const STOCKS_ROUTE_NAME = 'stocks'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: INCOME_ROUTE_NAME },
    },
    {
      path: '/incomes',
      name: INCOME_ROUTE_NAME,
      component: () => import('@/pages/incomes/IncomesPage.vue'),
      meta: { title: 'Доходы' },
    },
    {
      path: '/orders',
      name: ORDERS_ROUTE_NAME,
      component: () => import('@/pages/orders/OrdersPage.vue'),
      meta: { title: 'Заказы' },
    },
    {
      path: '/sales',
      name: SALES_ROUTE_NAME,
      component: () => import('@/pages/sales/SalesPage.vue'),
      meta: { title: 'Продажи' },
    },
    {
      path: '/stocks',
      name: STOCKS_ROUTE_NAME,
      component: () => import('@/pages/stocks/StocksPage.vue'),
      meta: { title: 'Склады' },
    },
  ],
})

export default router
