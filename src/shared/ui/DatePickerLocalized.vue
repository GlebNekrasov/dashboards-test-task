<template>
  <div class="date-picker-localized">
    <TypographyText>{{ title }}</TypographyText>
    <DatePicker
      class="date-picker"
      v-model:value="dateDayjs"
      :locale="locale"
      :disabled="disabled"
      @change="handleChange"
    />
  </div>
</template>
<script setup lang="ts">
import locale from 'ant-design-vue/es/date-picker/locale/ru_RU'
import { DatePicker, TypographyText } from 'ant-design-vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { ref, watch } from 'vue'

type DatePickerLocalizedProps = {
  title?: string
  disabled?: boolean
}

defineProps<DatePickerLocalizedProps>()

const dateText = defineModel<string>('dateText', { default: '' })
const dateDayjs = ref<dayjs.Dayjs | undefined>(undefined)
dayjs.locale('ru')

// Синхронизация dateText -> dateDayjs при монтировании и изменениях
watch(
  dateText,
  (newValue) => {
    if (newValue && newValue !== dateDayjs.value?.format('YYYY-MM-DD')) {
      dateDayjs.value = dayjs(newValue)
    } else if (!newValue) {
      dateDayjs.value = undefined
    }
  },
  { immediate: true },
)

const handleChange = (date: dayjs.Dayjs | string, dateString: string) => {
  dateText.value = dateString
}
</script>

<style lang="less" scoped>
.date-picker-localized {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 120px;
}
</style>
