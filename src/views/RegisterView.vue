<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="member"
    :rules="rules"
    label-width="auto"
  >
    <el-form-item label="手機號碼" prop="phone">
      <el-input v-model="member.phone" maxlength="10" />
    </el-form-item>
    <el-form-item label="暱稱" prop="name">
      <el-input v-model="member.name" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">
        註冊並登入
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { register } from '@/api/index'
import { useRouter } from 'vue-router'
import type MemberForm from '@/types/member-form'
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const member = ref<MemberForm>({
  phone: '',
  name: '',
})
const auth = useAuthStore()
const router = useRouter()

const rules = reactive<FormRules<MemberForm>>({
  phone: [
    { required: true, message: '手機號碼必填', trigger: 'blur' },
    { len: 10, message: '手機號碼長度10', trigger: 'blur' },
    { pattern: /^09\d{8}$/, message: '手機號碼格式09xxxxxxxx，純數字', trigger: 'blur' },
  ],
})

const submit = async () => {
  if (!ruleFormRef.value) return
  const res = await register(member.value)
  auth.login(res.id, res.phone, res.name)
  router.push('/initTripView')
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>
