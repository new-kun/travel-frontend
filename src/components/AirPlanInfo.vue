<template>
  <el-form>
    <el-row>
      <el-col>
        <div class="demo-datetime-picker">
          <div class="block">
            <el-date-picker
              v-model="value3"
              type="datetimerange"
              start-placeholder="起飛時間"
              end-placeholder="抵達時間"
              format="YYYY-MM-DD HH:mm"
              date-format="YYYY/MM/DD ddd"
              time-format="hh:mm"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-input placeholder="起飛(當地時間)" disabled></el-input>
      </el-col>
      <el-col :span="8">
      </el-col>
      <el-col :span="8">        
        <el-select v-model="select" placeholder="Select">
          <el-option label="同日抵達" value="0" />
          <el-option label="+1天(隔日)" value="1" />
        </el-select>
      </el-col>    
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-input v-model="startPlane"></el-input>
      </el-col>
      <el-col :span="8">
      </el-col>
      <el-col :span="8">
        <el-input v-model="targetPlane"></el-input>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const select = ref('')

const startPlane = ref('TPA');

const targetPlane = ref('Finish');



const value3 = ref<[Date, Date] | null>(null)

// const inputText = computed(() => {
//   if (!value3.value) return ''
//   const [s, e] = value3.value
//   return `${s.toLocaleString()} ~ ${e.toLocaleString()}`
// })

</script>

