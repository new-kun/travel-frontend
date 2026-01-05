<template>
   <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
  >
    <el-form-item label="手機號碼" prop="phone">
      <el-input v-model="ruleForm.phone"  maxlength="10" />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="submitForm">
        登入
      </el-button>
      <el-button @click="toRegister">前往註冊</el-button>
    </el-form-item>
  </el-form>
</template>


<script setup lang="ts">
  import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { login } from '@/api/index'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'

  interface RuleForm {
  phone: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  phone: '' 
})

const rules = reactive<FormRules<RuleForm>>({
  phone: [
    { required: true, message: '手機號碼必填', trigger: 'blur' },
    { len: 10, message: '手機號碼長度10', trigger: 'blur' },
    { pattern: /^09\d{8}$/, message: '手機號碼格式09xxxxxxxx，純數字', trigger: 'blur' },
  ],
})
const auth = useAuthStore()
const router = useRouter()

const submitForm = async () => {
  if (!ruleFormRef.value) return
  try{
    await ruleFormRef.value.validate()

    const userPhone = ruleForm.phone
    const res = await login(userPhone)
    auth.login(res.id, res.phone, res.name)
  router.push('/setupTrip')

  } catch (err) {
    // 驗證失敗
    console.warn('表單驗證失敗', err)
  }
  
}



const toRegister = () => {
  router.push('/register')
}

</script>
