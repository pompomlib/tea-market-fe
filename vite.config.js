import {
    defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/api': { // 代理标识（请求以 /api 开头时触发代理）
                target: 'http://localhost:9099', // 你的后端地址
                changeOrigin: true, // 修改请求头中的 Origin
                rewrite: (path) => path.replace(/^\/api/, '') // 移除 /api 前缀
            }
        }
    }
})