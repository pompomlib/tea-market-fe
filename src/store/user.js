import {
    defineStore
} from 'pinia'
import {
    ref
} from 'vue'

export const useUserStore = defineStore('user', () => {
    const token = ref("我是token");
    return {
        token
    };
})