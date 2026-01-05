<!-- src/components/trip/PlanList.vue -->
<template>
  <div v-if="currentDay">
    <h3>{{ currentDay.date }}</h3>

    <ul>
      <PlanItem
        v-for="(item, idx) in currentDay.items"
        :key="idx"
        :item="item"
        :index="idx"
        @remove="remove"
      />
    </ul>

    <button @click="add">＋新增行程</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTripStore } from '@/stores/travelStore'
import type { TripItem } from '@/types/trip-type'
import PlanItem from './PlanItem.vue'

const trip = useTripStore()
const currentDay = computed(() => trip.currentDay)

function add() {
  const item: TripItem = {
    time: '',
    type: 'spot',
    activity: '新行程',
    location: '',
    note: '',
  }
  trip.addItem(item)
}

function remove(index: number) {
  trip.removeItem(index)
}
</script>
