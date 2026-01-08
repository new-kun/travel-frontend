export interface TripSetup {
  destination: string
  startDate: string
  days: number
}

export interface TripItem {
  time: string
  type: 'spot' | 'food' | 'shop' | 'transport' | 'flight'
  activity: string
  location: string
  note?: string
}

export interface DayPlan {
  date: string
  shortDate: string
  fullDate: string
  title: string
  items: TripItem[]
  flight: any | null
}



export interface TripModel {
  arrDate: string[]
  airPlanDateTimeRange: Date[]
  airPlanStartPlace: string
  airPlanTargetPlace: string
  airPlaneTargetSelect: string
}