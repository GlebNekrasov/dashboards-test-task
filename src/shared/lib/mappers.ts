import type { DefaultOptionType } from 'ant-design-vue/es/select'
import { sorter } from '@/shared/lib/sorter'

export function valuesToSortedOptionsMapper<T extends string | number | null | undefined>(
  values: T[],
): DefaultOptionType[] {
  const sortedValues = sorter(values)

  return sortedValues.map((value) => ({
    label: value,
    value: value,
  }))
}
