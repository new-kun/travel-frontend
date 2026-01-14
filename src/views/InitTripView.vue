<template>
  <el-button plain @click="centerDialogVisible = true"> 開啟彈窗 </el-button>

  <el-dialog
    v-model="centerDialogVisible"
    title="旅行計畫"
    width="500"
    align-center
  >
    <el-form :model="form">
      <el-row>
        <el-col>
          <el-form-item label="目的地(英文/中文)">
            <el-input
              v-model="form.destination"
              maxlength="20"
              placeholder="日本、Osaka"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <!-- 1/3 -->
        <el-col :span="16">
          <el-form-item label="開始日期" prop="startDate">
            <el-date-picker
              v-model="form.startDate"
              type="date"
              placeholder="Pick a day"
              :size="size"
            />
          </el-form-item>
        </el-col>

        <!-- 2/3 -->
        <el-col :span="8">
          <el-form-item label="天數" prop="offsetDays">
            <el-input-number v-model="form.offsetDays" :min="1" :max="10" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="匯率" props="rate">
            <el-input-number
              v-model="form.rate"
              :precision="3"
              :step="0.001"
              :max="1000"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelTrip">返回</el-button>
        <el-button type="primary" @click="confirm"> 開始規劃 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/authStore";
import dayjs, { Dayjs } from "dayjs";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

interface initTripForm {
  userPhone: string;
  userName: string;
  destination: string;
  startDate: Dayjs;
  offsetDays: number;
  rate: number;
}
const size = ref<"default" | "large" | "small">("default");

const centerDialogVisible = ref(false);
const auth = useAuthStore();
const router = useRouter();

const form = reactive<initTripForm>({
  userPhone: auth.user.phone ?? "",
  userName: auth.user.userName ?? "",
  destination: "日本",
  startDate: dayjs(),
  offsetDays: 3,
  rate: 0.215,
});

const confirm = () => {
  //新增旅行計畫API
  centerDialogVisible.value = false;
  router.push("trip");
};

const cancelTrip = () => {
  centerDialogVisible.value = false;
  router.back();
};
</script>
