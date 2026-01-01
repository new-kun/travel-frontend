import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// views
import LoginView from '@/views/LoginView.vue'
import MemberHome from '@/views/MemberHome.vue'
import TripView from '@/views/TripView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/member',
      name: 'member',
      component: MemberHome,
      meta: { requiresAuth: true },
    },
    {
      path: '/trip',
      name: 'trip',
      component: TripView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
  ],
})

/**
 * 🔐 全域路由守衛
 * 沒有會員資料 → 導向登入頁
 */
router.beforeEach((to) => {
  const auth = useAuthStore()

  // 已登入卻還想進 login，直接送去會員頁
  if (to.name === 'login' && auth.isLogin) {
    return { name: 'member' }
  }

  // 需要登入但尚未登入 → 導回登入頁
  if (to.meta.requiresAuth && !auth.isLogin) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }, // optional：登入後導回
    }
  }

  return true
})

export default router
