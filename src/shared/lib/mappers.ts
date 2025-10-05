import type { DefaultOptionType } from 'ant-design-vue/es/select'

export function valuesToSortedOptionsMapper<T extends string | number | null | undefined>(
  values: T[],
): DefaultOptionType[] {
  const sortedValues = [...values].sort((a, b) => {
    // null/undefined в конец
    if (a == null && b == null) return 0
    if (a == null) return 1
    if (b == null) return -1

    // Числа от меньшего к большему
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b
    }

    // Строки от А до Я
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b)
    }

    // Смешанные типы - конвертируем в строки
    return String(a).localeCompare(String(b))
  })

  return sortedValues.map((value) => ({
    label: value,
    value: value,
  }))
}
