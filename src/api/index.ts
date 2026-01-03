// api/member.api.ts
import type MemberForm from '@/types/member-form'
import axios from 'axios'

export const register = async (value: MemberForm) => {
  const res = await axios.post('/api/member/register', value)
  return res.data
}

export const login = async (phone: string) => {
  const res = await axios.post('/api/member/login', { phone })
  return res.data
}

export const test_render = async () => {
  const res = await axios.get('/render_api/home')
  return res.data
}