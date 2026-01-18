import type { Dayjs } from "dayjs";

export interface TripSetup {
  destination: string;
  startDate: string;
  days: number;
}

export interface TripItem {
  time: string;
  type: "spot" | "food" | "shop" | "transport" | "flight";
  activity: string;
  location: string;
  note?: string;
}

export interface DayPlan {
  date: string;
  shortDate: string;
  fullDate: string;
  title: string;
  items: TripItem[];
  flight: any | null;
}

export interface TripModel {
  arrDate: string[];
  airPlanDateTimeRange: Date[];
  airPlanStartPlace: string;
  airPlanTargetPlace: string;
  airPlaneTargetSelect: string;
}

export interface InitTripForm {
  //會員電話
  userPhone: string;
  //會員暱稱
  userName: string;
  //目的地
  destination: string;
  // 開始日期
  startDate: string;
  // 幾天
  offsetDays: number;
  // 匯率
  rate: number;
  // 幣別
  currency: string;
}

export interface RateForm {
  //幣別
  currency: string;
}

export interface TripForm {
  // 旅行計畫編號
  id: number;
  // 會員編號
  memberId: number;
  // 會員電話
  userPhone: string;
  // 會員暱稱
  userName: string;
  // 目的地
  destination: string;
  // 旅行日期
  tripDate: Dayjs;
  // 匯率
  rate: number;
}

export interface TripDetailForm {
  //旅遊細節編號
  id: number;
  //活動開始時間
  startTime: string;
  //活動類型
  activityType: string;
  //活動主題
  activityTitle: string;
  //活動地點
  activityPlace: string;
  //活動備註
  activityMemo: string;
  //旅遊日期
  tripDetailDate: string;
  //會員電話
  userPhone: string;
}
