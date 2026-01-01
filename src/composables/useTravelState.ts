import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTravelStore = defineStore("trval", () => {
    const plans = ref<string[]>([])
    const selectedCity = ref("");
    const totalCost = ref(0);

    //新增計畫
    function addPlan(plan: string) {
        plans.value.push(plan);
    }

    //清空計畫
    function clearPlans(){
        plans.value = [];
        totalCost.value = 0;
    }
    
    // ===== 衍生狀態（computed）=====
  const planCount = computed(() => plans.value.length)

  return {
    plans,
    selectedCity,
    totalCost,
    planCount,
    addPlan,
    clearPlans,
  }
})