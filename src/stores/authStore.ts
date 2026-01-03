import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const id = ref<number | undefined>(undefined);
    const phone = ref<string | undefined>(undefined);
    const userName = ref<string | undefined>(undefined);

    const isLogin = computed(() => id.value !== undefined);

    function login(memberId: number| undefined, phoneNo: string, name: string) {
        id.value = memberId;
        phone.value = phoneNo;
        userName.value = name;
    }

    function logout() {
        id.value = undefined;
        phone.value = undefined;
        userName.value = undefined;
    }

    return { id, phone, userName, login, logout, isLogin };

})