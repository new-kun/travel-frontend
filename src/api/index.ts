import http from "@/utils/http";
import type MemberForm from "@/types/member-form";
import type { MemberResponse } from "@/types/member-reponse";
import type { InitTripForm, TripDetailForm } from "@/types/trip-type";

export const register = async (value: MemberForm): Promise<MemberResponse> => {
  const res = await http.post<MemberResponse>("/member/register", value);
  return res.data;
};

export const login = async (phone: string): Promise<MemberResponse> => {
  const res = await http.post<MemberResponse>("/member/login", { phone });
  return res.data;
};

/** 建立旅程 */
export const initTrip = async (initTripForm: InitTripForm) => {
  const res = await http.post("/api/trip/init", initTripForm);
  return res.data;
};

/** 取得最新的旅遊資訊 */
export const getLastTrip = async (userPhone: string) => {
  const res = await http.post("/api/trip/getLastTrip", { userPhone });
  return res.data;
};

/** 取得匯率 */
export const getRateApi = async (currency: string) => {
  const res = await http.post("/api/public/getRate", { currency: currency });
  return res.data;
};

/** 更新旅遊細節 */
export const updateTripDetail = async (form: TripDetailForm) => {
  const res = await http.post("/api/trip/updateTripDetail", form);
  // console.log("回傳資料" + JSON.stringify(res));
  return res.data;
};

/** 取得當日行程 */
export const getTripDetailList = async (
  userPhone: string,
  tripDate: string,
) => {
  const res = await http.post("/api/trip/getTripDetailList", {
    userPhone: userPhone,
    tripDate: tripDate,
  });
  // console.log("回傳資料" + JSON.stringify(res));
  return res.data;
};
