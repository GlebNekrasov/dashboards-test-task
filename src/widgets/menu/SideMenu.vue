<template>
  <div class="side-menu">
    <Menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :items="menuItems"
      @click="handleMenuClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu } from 'ant-design-vue'
import type { MenuProps } from 'ant-design-vue'
import {
  DollarOutlined,
  ShoppingOutlined,
  LineChartOutlined,
  InboxOutlined,
} from '@ant-design/icons-vue'
import { h } from 'vue'
import {
  INCOME_ROUTE_NAME,
  ORDERS_ROUTE_NAME,
  SALES_ROUTE_NAME,
  STOCKS_ROUTE_NAME,
} from '@/app/router'

const router = useRouter()
const route = useRoute()
const selectedKeys = ref<string[]>([route.name as string])

const menuItems: MenuProps['items'] = [
  {
    key: INCOME_ROUTE_NAME,
    icon: () => h(DollarOutlined),
    label: 'Доходы',
  },
  {
    key: ORDERS_ROUTE_NAME,
    icon: () => h(ShoppingOutlined),
    label: 'Заказы',
  },
  {
    key: SALES_ROUTE_NAME,
    icon: () => h(LineChartOutlined),
    label: 'Продажи',
  },
  {
    key: STOCKS_ROUTE_NAME,
    icon: () => h(InboxOutlined),
    label: 'Остатки',
  },
]

const handleMenuClick = ({ key }: { key: string | number }) => {
  router.push({ name: key as string })
}

watch(
  () => route.name,
  (newName) => {
    if (newName) {
      selectedKeys.value = [newName as string]
    }
  },
)
</script>

<style lang="less" scoped>
.side-menu {
  height: 100%;
  background: #fff;
}
</style>
