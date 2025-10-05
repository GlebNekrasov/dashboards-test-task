<template>
  <Layout class="app-layout">
    <LayoutSider class="app-layout__sider">
      <SideMenu />
    </LayoutSider>
    <Layout>
      <LayoutContent class="app-layout__content">
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <PageHeader class="app-layout__content-page-header" :title="title">
              <component :is="Component" />
            </PageHeader>
          </KeepAlive>
        </RouterView>
      </LayoutContent>
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { Layout, LayoutContent, LayoutSider, PageHeader } from 'ant-design-vue'
import { SideMenu } from '@/widgets/menu'
import { computed } from 'vue'

const route = useRoute()
const title = computed(() => route.meta.title as string)

const siderWidth = 200
</script>

<style lang="less">
body {
  margin: 0;
}
</style>

<style lang="less" scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  margin-left: v-bind('siderWidth + "px"');

  &__sider {
    position: fixed;
    z-index: 11;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    overflow: hidden;
  }

  &__content {
    display: flex;
    min-height: 100vh;

    &-page-header {
      width: 100%;
      padding: 12px;
    }
  }
}
</style>
