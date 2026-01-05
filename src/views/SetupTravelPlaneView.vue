<template>
  <div>
    <h2>建立新旅程</h2>

    <div>
      <label>目的地</label>
      <input v-model="form.destination" placeholder="例如：Tokyo" />
    </div>

    <div>
      <label>開始日期</label>
      <input type="date" v-model="form.startDate" />
    </div>

    <div>
      <label>天數</label>
      <input type="number" min="1" max="30" v-model.number="form.days" />
    </div>

    <button @click="submit">
      開始規劃
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useTripStore } from '@/stores/travelStore'
import type { TripSetup } from '@/types/trip-type'

const router = useRouter()
const tripStore = useTripStore()

/**
 * 表單資料
 * ❌ 不存 store
 * ❌ 不存 localStorage
 */
const form = reactive<TripSetup>({
  destination: '',
  startDate: new Date().toISOString().slice(0, 10),
  days: 3,
})


function submit() {
  if (!form.destination) {
    alert('請輸入目的地')
    return
  }

  tripStore.initTrip({ ...form })

  router.push('/trip')
}
</script>
