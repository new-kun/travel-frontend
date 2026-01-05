// src/stores/tripStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { TripSetup, DayPlan, TripItem } from '@/types/trip-type'

export const useTripStore = defineStore('trip', () => {
  /** ===== state ===== */
  const setup = ref<TripSetup | null>(null)
  const days = ref<DayPlan[]>([])
  const currentDayIdx = ref(0)

  /** ===== getters ===== */
  const currentDay = computed<DayPlan | undefined>(() => {
    return days.value[currentDayIdx.value]
  })

  /** ===== actions ===== */
  function initTrip(tripSetup: TripSetup) {
    setup.value = tripSetup
    days.value = generateDays(tripSetup)
    currentDayIdx.value = 0
  }

  function resetTrip() {
    setup.value = null
    days.value = []
    currentDayIdx.value = 0
  }

  function generateDays(tripSetup: TripSetup): DayPlan[] {
    const result: DayPlan[] = []
    const start = new Date(tripSetup.startDate)
    const week = ['日', '一', '二', '三', '四', '五', '六']

    for (let i = 0; i < tripSetup.days; i++) {
      const d = new Date(start)
      d.setDate(start.getDate() + i)

      const yyyy = d.getFullYear()
      const mm = d.getMonth() + 1
      const dd = d.getDate()

      const fullDate = `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`

      result.push({
        date: `${mm}/${dd} (${week[d.getDay()]})`,
        shortDate: `${mm}/${dd}`,
        fullDate,
        title: i === 0 ? '抵達 & 探索' : '行程規劃',
        items: [],
        flight: null,
      })
    }

    return result
  }

  function addItem(item: TripItem) {
    currentDay.value?.items.push(item)
  }

  function removeItem(index: number) {
    currentDay.value?.items.splice(index, 1)
  }

  function switchDay(index: number) {
    currentDayIdx.value = index
  }

  return {
    setup,
    days,
    currentDayIdx,
    currentDay,
    initTrip,
    resetTrip,
    addItem,
    removeItem,
    switchDay,
  }
})
