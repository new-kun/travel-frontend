<!-- 行程單筆顯示 -->
<template>
  <li>
    <strong>{{ item.time || '--:--' }}</strong>
    {{ item.activity }}
    <small>({{ item.location }})</small>

    <button @click="remove">刪除</button>
  </li>
</template>

<script setup lang="ts">
import type { TripItem } from '@/types/trip-type'

const props = defineProps<{
  item: TripItem
  index: number
}>()

const emit = defineEmits<{
  (e: 'remove', index: number): void
}>()

function remove() {
  emit('remove', props.index)
}
</script>
