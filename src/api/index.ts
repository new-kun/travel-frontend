// api/member.api.ts
import axios from 'axios'

export const register = async (phone: string) => {
  const res = await axios.post('/api/member/register', { phone })
  return res.data
}
