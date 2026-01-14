// import router from "@/router"
// import { useAuthStore } from "@/stores/authStore"
import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000,
  withCredentials: false, // 如果之後用 cookie 再改
});
// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

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

export default http;
