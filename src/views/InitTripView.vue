<template>
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
    <el-row justify="center" :gutter="16">
      <!-- 1/3 -->
      <el-col :span="16">
        <el-form-item label="開始日期" prop="startDate">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="YYYY-MM-DD"
            format="YYYY-MM-DD"
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
    <el-row justify="center" :gutter="16">
      <el-col :span="10">
        <el-form-item label="兌換幣別">
          <el-select
            placeholder="選擇幣別"
            v-model="form.currency"
            :options="options"
            @change="getRate"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="今日匯率" props="rate">
          <el-input v-model.number="form.rate" disabled />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row justify="center" :gutter="16">
      <el-col :span="6">
        <el-button @click="cancelTrip">返回</el-button>
      </el-col>

      <el-col :span="6">
        <el-button type="primary" @click="confirm"> 開始規劃 </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { getRateApi, initTrip } from "@/api";
import { useAuthStore } from "@/stores/authStore";
import type { InitTripForm } from "@/types/trip-type";
import dayjs from "dayjs";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const size = ref<"default" | "large" | "small">("default");
const auth = useAuthStore();
const router = useRouter();

const form = reactive<InitTripForm>({
  userPhone: auth.user.phone ?? "",
  userName: auth.user.userName ?? "",
  destination: "日本",
  startDate: dayjs().format("YYYY-MM-DD"),
  offsetDays: 3,
  rate: 0,
  currency: "",
});

const options = [
  {
    value: "JPY",
    label: "日圓",
  },
  {
    value: "USD",
    label: "美金",
  },
  {
    value: "KRW",
    label: "韓元",
  },
  {
    value: "MYR",
    label: "馬來幣",
  },
  {
    value: "CNY",
    label: "人民幣",
  },
];

const confirm = async () => {
  //新增旅行計畫API
  console.log("確認form" + JSON.stringify(form));
  const result = await initTrip(form);
  console.log("回傳結果" + JSON.stringify(result));
  router.push("trip");
};

const cancelTrip = () => {
  router.back();
};
const getRate = async () => {
  const res = await getRateApi(form.currency);
  form.rate = res.data;
};
</script>
