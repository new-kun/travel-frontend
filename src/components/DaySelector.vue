<!-- 切換Day -->
<template>
  <div>
    <button
      v-for="(day, index) in days"
      :key="day.fullDate"
      @click="switchDay(index)"
      :style="{ fontWeight: index === currentDayIdx ? 'bold' : 'normal' }"
    >
      D{{ index + 1 }}
      <small>{{ day.shortDate }}</small>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTripStore } from '@/stores/travelStore'

const trip = useTripStore()

const days = computed(() => trip.days)
const currentDayIdx = computed(() => trip.currentDayIdx)

function switchDay(index: number) {
  trip.switchDay(index)
}
</script>
