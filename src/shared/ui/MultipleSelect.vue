<template>
  <div class="multiple-select">
    <TypographyText>{{ title }}</TypographyText>
    <Select
      :class="['select', className]"
      v-model:value="value"
      :allow-clear="allowClear"
      :max-tag-count="maxTagCount"
      mode="multiple"
      :options="sortedOptions"
      :placeholder="placeholder"
      :disabled="disabled"
      :loading="loading"
      :show-search="showSearch"
      :filter-option="filterOption"
    />
  </div>
</template>

<script setup lang="ts">
import { Select, TypographyText } from 'ant-design-vue'
import type { SelectProps } from 'ant-design-vue'
import type { DefaultOptionType } from 'ant-design-vue/es/select'
import { computed } from 'vue'
import { valuesToSortedOptionsMapper } from '../lib/mappers'

type MultipleSelectValue = string[] | number[] | undefined

type MultipleSelectProps = {
  options: DefaultOptionType['value'][]
  placeholder?: string
  allowClear?: boolean
  maxTagCount?: number | 'responsive'
  disabled?: boolean
  loading?: boolean
  showSearch?: boolean
  filterOption?: SelectProps['filterOption']
  className?: string
  title?: string
  width?: number
}

const value = defineModel<MultipleSelectValue>('value', { default: [] })

const props = withDefaults(defineProps<MultipleSelectProps>(), {
  allowClear: true,
  maxTagCount: 1,
  disabled: false,
  loading: false,
  showSearch: true,
  placeholder: undefined,
  className: '',
  title: '',
  width: 200,
})

const sortedOptions = computed(() => {
  return valuesToSortedOptionsMapper(props.options)
})
</script>

<style lang="less" scoped>
.multiple-select {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 200px;
}

.select {
  width: v-bind('width + "px"');
}
</style>
