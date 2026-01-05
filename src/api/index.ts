import http from '@/utils/http'
import type MemberForm from '@/types/member-form'
import type { MemberResponse } from '@/types/member-reponse'
import type { DayPlan, TripSetup } from '@/types/trip-type'


export const register = async (value: MemberForm): Promise<MemberResponse> => {
  const res = await http.post<MemberResponse>('/member/register', value)
  return res.data
}

export const login = async (phone: string): Promise<MemberResponse> => {
  const res = await http.post<MemberResponse>('/member/login', { phone })
  return res.data
}

/** 建立旅程 */
export const createTrip = async (setup: TripSetup) => {
  const res = await http.post('/trip/create', setup)
  return res.data
}

/** 取得旅程天數（使用 POST） */
export const fetchTripDays = async (
  tripId: number
): Promise<DayPlan[]> => {
  const res = await http.post<DayPlan[]>('/trip/days', {
    tripId,
  })
  return res.data
}