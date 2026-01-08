<!-- src/views/TripView.vue -->
<template>
   <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="tripForm"
    label-width="auto"
  >
  <!-- 標頭 -->
  <el-row>
    <el-col>
      <el-form-item>
        <TripHeader />
      </el-form-item>
    </el-col>
  </el-row>

  <!-- 航班 -->
  <el-row v-if="!showAipPlaneInfo && showButton">
    <el-col>
      <el-button type="success" @click="addAirPlaneInfo">新增航班</el-button>
    </el-col>
  </el-row>
  <el-row v-if="showAipPlaneInfo">
    <el-col>
      <el-form-item prop="dateRange">
        <div class="demo-datetime-picker">
            <div class="block">
              <el-date-picker
                v-model="tripForm.airPlanDateTimeRange"
                type="datetimerange"
                start-placeholder="起飛時間"
                end-placeholder="抵達時間"
                format="YYYY-MM-DD HH:mm"
                date-format="YYYY/MM/DD ddd"
                time-format="hh:mm"
              />
            </div>
          </div>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row v-if="showAipPlaneInfo">
    <el-col :span="8">
      <el-form-item label="起飛地">
        <el-input v-model="tripForm.airPlanStartPlace"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="目的地">
        <el-input v-model="tripForm.airPlanTargetPlace"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  
   <el-row>
    <el-col :span="6"></el-col>
    <el-col :span="8">
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          儲存
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">清空</el-button>
      </el-form-item>
    </el-col>    
   </el-row>
  </el-form>
</template>

<script setup lang="ts">
import TripHeader from '@/components/TripHeader.vue'
import type { TripModel } from '@/types/trip-type';

import type { FormInstance } from 'element-plus';
import { computed, reactive, ref } from 'vue';

const ruleFormRef = ref<FormInstance>();

const showButton = ref(true);

const showAipPlaneInfo = computed(() => {
  return tripForm.airPlanStartPlace
});



const tripForm = reactive<TripModel>({
  arrDate: ["1", "2"],
  airPlanDateTimeRange: [new Date(), new Date()],
  airPlanStartPlace: '',
  airPlanTargetPlace: "日本",
  airPlaneTargetSelect: "0"
})

const addAirPlaneInfo = () => {
  showButton.value = false;
  tripForm.airPlanStartPlace='桃園'

}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
