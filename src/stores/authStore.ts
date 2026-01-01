import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const id = ref<number | undefined>(undefined);
    const phone = ref<string | undefined>(undefined);

    const isLogin = computed(() => id.value !== undefined);

    function login(memberId: number| undefined, phoneNo: string) {
        id.value = memberId;
        phone.value = phoneNo;
    }

    function logout() {
        id.value = undefined;
        phone.value = undefined;
    }

    return { id, phone, login, logout, isLogin };

})