<!-- src/views/TripView.vue -->
<template>
  <div>
    <TripHeader />

    <DaySelector />

    <PlanList />
  </div>
</template>

<script setup lang="ts">
import TripHeader from '@/components/TripHeader.vue'
import DaySelector from '@/components/DaySelector.vue'
import PlanList from '@/components/PlanList.vue'

/**
 * ❌ 不直接操作資料
 * ❌ 不直接改 days
 * ✅ 所有狀態都在 store 裡
 */
</script>
