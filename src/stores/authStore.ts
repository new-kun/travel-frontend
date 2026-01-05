import type { AuthUser } from "@/types/auth-type";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const user = ref<AuthUser>({})

    const isLogin = computed(() => user.value.id !== undefined);

    function login(memberId: number| undefined, phoneNo: string, name: string) {
        user.value = {
      id: memberId,
      phone: phoneNo,
      userName: name,
    }
    }

    function logout() {
        user.value = {};
    }

    return { user, login, logout, isLogin };

})