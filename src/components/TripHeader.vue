<!-- 旅程標題 -->
<template>
  <header>
    <h2>{{ title }}</h2>
    <p v-if="setup">
      {{ setup.destination }}｜
      {{ setup.startDate }}｜
      {{ setup.days }} 天
    </p>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTripStore } from '@/stores/travelStore'

const trip = useTripStore()

const setup = computed(() => trip.setup)

const title = computed(() => {
  return setup.value?.destination ?? '我的旅程'
})
</script>
