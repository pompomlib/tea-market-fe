import {
    createApp
} from 'vue';
import {
    createPinia
} from 'pinia';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "./tailwindcss.css"

import router from './router/router.js';
import App from './App.vue';

import axios from 'axios';



const app = createApp(App);

Object.keys(ElementPlusIconsVue).forEach((key) => {
    app.component(key, ElementPlusIconsVue[key]);
})

app.config.globalProperties.$axios = axios

axios.defaults.baseURL = 'http://localhost:9099/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


const pinia = createPinia();
app.use(router).use(pinia);
app.use(ElementPlus);
app.mount('#app');