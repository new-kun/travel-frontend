// import router from "@/router"
// import { useAuthStore } from "@/stores/authStore"
import axios from "axios"

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000,
  withCredentials: false, // 如果之後用 cookie 再改
})

// request interceptor
// http.interceptors.request.use(
//   (config) => {
//     const auth = useAuthStore()

//     if (auth.token) {
//       config.headers.Authorization = `Bearer ${auth.token}`
//     }

//     return config
//   },
//   (error) => Promise.reject(error)
// )

// response interceptor
// http.interceptors.response.use(
//   (response) => {
//     // 👉 統一只回 data
//     return response.data
//   },
//   (error) => {
//     const status = error.response?.status

//     if (status === 401) {
//       const auth = useAuthStore()
//       auth.logout()
//       router.push({ name: 'login' })
//     }

//     return Promise.reject(error)
//   }
// )

export default http