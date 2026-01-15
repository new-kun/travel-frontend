import http from "@/utils/http";
import type MemberForm from "@/types/member-form";
import type { MemberResponse } from "@/types/member-reponse";
import type { DayPlan, InitTripForm, TripSetup } from "@/types/trip-type";

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

/** 取得旅程天數（使用 POST） */
export const fetchTripDays = async (tripId: number): Promise<DayPlan[]> => {
  const res = await http.post<DayPlan[]>("/trip/days", {
    tripId,
  });
  return res.data;
};

/** 取得匯率 */
export const getRateApi = async (currency: string) => {
  const res = await http.post("/api/public/getRate", { currency: currency });
  return res.data;
};
