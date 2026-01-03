<template>
  <div>
    <h2>手機註冊</h2>
    <div>
<input v-model="member.phone" placeholder="請輸入手機號碼" />
    </div>
    <div>
<input v-model="member.name" placeholder="請輸入暱稱" />
    </div>
    <div>
<button @click="submit">註冊並登入</button>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { register, test_render } from '@/api/index'
import { useRouter } from 'vue-router'
import type MemberForm from '@/types/member-form'

const member = ref<MemberForm>({
  phone: '',
  name: '',
});
const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  const res = await register(member.value)
  auth.login(res.id, res.phone, res.name)
  router.push('/member')
}

onMounted(async () => {
  const res = await test_render();
  console.log(res)
})
</script>