<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <!-- 旅遊資訊 -->
    <el-tab-pane label="旅遊資訊" name="trip">
      <!-- 旅遊期程 -->
      <el-row :gutter="16">
        <el-col>
          <el-radio-group
            v-model="tripDate"
            size="large"
            fill="#409eff"
            @change="getTripDtl"
          >
            <el-radio-button
              v-for="(date, index) in tripDateList"
              :key="index"
              :label="date"
            >
              {{ dayjs(date).format("YYYY-MM-DD") }}
            </el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <!-- 當天旅遊資訊 -->
      <el-form ref="dtlFormRef" :model="tripDetailForm">
        <el-row :gutter="16" align="middle">
          <el-col :span="12">
            <el-row>
              <el-col>
                <el-form-item label="活動開始" prop="startTime">
                  <el-time-select
                    v-model="tripDetailForm.startTime"
                    start="00:00"
                    end="23:59"
                    size="large"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="活動類型" prop="activityType">
                  <el-select
                    v-model="tripDetailForm.activityType"
                    :options="scheduleOptions"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col>
                <el-form-item label="主題" prop="activityTitle">
                  <el-input v-model="tripDetailForm.activityTitle"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="地點" prop="activityPlace">
                  <el-input v-model="tripDetailForm.activityPlace">
                    <template #append>
                      <el-button
                        type="primary"
                        tag="a"
                        :href="`https://www.google.com/maps/search/${encodeURIComponent(tripDetailForm.activityPlace)}`"
                        target="_blank"
                        :icon="MapLocation"
                      />
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="備註" prop="activityMemo">
                  <el-input
                    v-model="tripDetailForm.activityMemo"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="16" justify="center">
          <el-col :span="4" :offset="2">
            <el-form-item>
              <el-button @click="resetInfo(dtlFormRef)">清空</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="2">
            <el-form-item>
              <el-button type="primary" @click="updateTripDtl">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- todo 航班 -->
      <template v-if="!isShow">
        <el-row :gutter="16">
          <el-col :span="24" style="text-align: center">
            <el-button type="success" :icon="Promotion">新增航班</el-button>
          </el-col>
        </el-row>
      </template>

      <!-- 日程表 -->
      <el-timeline>
        <el-timeline-item
          center
          v-for="(item, index) in timetableRef"
          :key="index"
          :timestamp="item.startTime"
          placement="top"
        >
          <el-card shadow="hover">
            <el-space
              direction="vertical"
              alignment="center"
              style="width: 100%"
            >
              <h4>{{ `${item.activityType} : ${item.activityTitle}` }}</h4>

              <div>
                <el-input v-model="item.activityPlace">
                  <template #append>
                    <el-button
                      type="primary"
                      tag="a"
                      :href="`https://www.google.com/maps/search/${encodeURIComponent(item.activityPlace)}`"
                      target="_blank"
                      :icon="MapLocation"
                    />
                  </template>
                </el-input>
              </div>

              <div>
                <el-input
                  v-model="item.activityMemo"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                ></el-input>
              </div>
            </el-space>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-tab-pane>

    <!-- 新增旅遊資訊 -->
    <el-tab-pane label="新增旅遊計畫" name="initTrip">
      <el-form ref="initRefForm" :model="initTripForm">
        <el-row>
          <el-col>
            <el-form-item label="目的地(英文/中文)">
              <el-input
                v-model="initTripForm.destination"
                maxlength="20"
                placeholder="日本、Osaka"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 開始日期 -->
        <el-row justify="center" :gutter="16">
          <el-col :span="16">
            <el-form-item label="開始日期" prop="startDate">
              <el-date-picker
                v-model="initTripForm.startDate"
                type="date"
                placeholder="YYYY-MM-DD"
                format="YYYY-MM-DD"
                :size="size"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="天數" prop="offsetDays">
              <el-input-number
                v-model="initTripForm.offsetDays"
                :min="1"
                :max="10"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!--匯率資訊 -->
        <el-row justify="center" :gutter="16">
          <el-col :span="10">
            <el-form-item label="兌換幣別">
              <el-select
                placeholder="選擇幣別"
                v-model="initTripForm.currency"
                :options="options"
                @change="getRate"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昨日匯率" prop="rate">
              <el-input v-model.number="initTripForm.rate" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="center" :gutter="16">
          <el-col :span="6">
            <el-button @click="restInitTripForm(initRefForm)"
              >清空表單</el-button
            >
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="confirmInitTrip">
              開始規劃
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="會員中心" name="memberCenter">
      Comming soon
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import type { FormInstance, TabsPaneContext } from "element-plus";
import {
  getLastTrip,
  getRateApi,
  getTripDetailList,
  initTrip,
  updateTripDetail,
} from "@/api";
import { useAuthStore } from "@/stores/authStore";
import type {
  TripDetailForm,
  InitTripForm,
  TripForm,
  TripModel,
} from "@/types/trip-type";
import dayjs from "dayjs";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { MapLocation, Promotion } from "@element-plus/icons-vue";

//現在時間
const dtlFormRef = ref<FormInstance>();
// 預設頁籤
const activeName = ref("trip");
//顯示航班
const isShow = ref(false);
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const size = ref<"default" | "large" | "small">("default");
const auth = useAuthStore();
const tripDate = ref("");
// 新增旅遊計畫響應式表單物件
const initRefForm = ref<FormInstance>();

const initTripForm = reactive<InitTripForm>({
  userPhone: auth.user.phone ?? "",
  userName: auth.user.userName ?? "",
  destination: "",
  startDate: dayjs().format("YYYY-MM-DD"),
  offsetDays: 3,
  rate: 0,
  currency: "",
});

//旅遊細節表單
const tripDetailForm = ref<TripDetailForm>({
  //旅遊細節編號
  id: 0,
  //活動開始時間
  startTime: dayjs().format("HH:mm"),
  //活動類型
  activityType: "",
  //活動主題
  activityTitle: "",
  //活動地點
  activityPlace: "",
  //活動備註
  activityMemo: "",
  //旅遊日期
  tripDetailDate: tripDate.value ?? "",
  //會員電話
  userPhone: auth.user.phone ?? "0975872879",
});

const scheduleOptions = [
  {
    label: "景點",
    value: "景點",
  },
  {
    label: "美食",
    value: "美食",
  },
  {
    label: "購物",
    value: "購物",
  },
  {
    label: "交通",
    value: "交通",
  },
];

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

const resetInfo = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const confirmInitTrip = async () => {
  //新增旅行計畫API
  console.log("確認form" + JSON.stringify(initTripForm));
  const result = await initTrip(initTripForm);
  console.log("回傳結果" + JSON.stringify(result));
  //切到旅遊資訊
  activeName.value = "trip";
};

// 清空旅遊計畫
const restInitTripForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const getRate = async () => {
  const res = await getRateApi(initTripForm.currency);
  initTripForm.rate = res.data;
};
const tripList = ref<TripForm[]>([]);

const tripDateList = computed(() =>
  tripList.value.map((item) => dayjs(item.tripDate).format("YYYY-MM-DD")),
);

const updateTripDtl = async () => {
  console.log("確認tripDate" + tripDate.value);
  tripDetailForm.value.tripDetailDate = tripDate.value ?? "";
  console.log("打API" + JSON.stringify(tripDetailForm.value));
  await updateTripDetail(tripDetailForm.value);
  //重新刷新資料
  await getTripDtl();
};
//旅遊時刻表
const timetableRef = ref<TripDetailForm[]>([]);

//取得行程表資料
const getTripDtl = async () => {
  const res = await getTripDetailList("0975872879", tripDate.value);
  // console.log("確認賦值前" + JSON.stringify(timetableRef.value));
  timetableRef.value = res.data;
  // console.log("確認賦值後" + JSON.stringify(timetableRef.value));
};

watch(
  tripList,
  (list) => {
    if (!list.length) return;
    const first = list[0];
    if (!first) return;
    // ⭐ 預設第一筆
    tripDate.value = dayjs(first.tripDate).format("YYYY-MM-DD");

    // ⭐ 同時載入該日行程
    getTripDtl();
  },
  { immediate: true },
);

// 初始化資料
onMounted(async () => {
  const res = await getLastTrip("0975872879");

  tripList.value = res.data.map((item: any) => ({
    ...item,
    tripDate: dayjs(item.tripDate), // ⭐ 關鍵轉型
  }));
  // tripDate.value = tripList.value[0]?.tripDate.format("YYYY-MM-DD") ?? "";
  // console.log("我需要被選擇 =" + tripDate.value);
});
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
</style>
