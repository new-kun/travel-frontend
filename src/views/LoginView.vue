<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { login, test_render } from '@/api/index'
import { useRouter } from 'vue-router'

const phone = ref('')
const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  const res = await login(phone.value)
  auth.login(res.id, res.phone, res.name)
  router.push('/member')
}

onMounted(async () => {
  const res = await test_render();
  console.log(res)
})

</script>

<template>
  <div>
    <h2>手機登入</h2>
    <div>
      <input v-model="phone" placeholder="請輸入手機號碼" />
    </div>
    <div>
      <button @click="submit">登入</button>
    </div>
  </div>
</template>
