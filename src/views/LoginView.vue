<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { register } from '@/api/index'
import { useRouter } from 'vue-router'

const phone = ref('')
const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  const res = await register(phone.value)
  auth.login(res.id, res.phone)
  router.push('/member')
}
</script>

<template>
  <div>
    <h2>手機註冊 / 登入</h2>
    <input v-model="phone" placeholder="請輸入手機號碼" />
    <button @click="submit">送出</button>
  </div>
</template>
