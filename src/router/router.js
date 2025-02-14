import {
    createRouter,
    createWebHashHistory
} from "vue-router";

const routes = [{
    path: '/',
    redirect: '/homepage',
}, {
    path: '/home',
    component: () => import("./../pages/home.vue"),
}, {
    path: '/login',
    component: () => import("./../components/LoginComponent.vue"),
}, {
    path: '/homepage',
    component: () => import("./../pages/homepage.vue"),
}, {
    path: '/customerhomepage',
    component: () => import("./../pages/customerhomepage.vue"),
}, {
    path: '/register',
    component: () => import("./../pages/register.vue"),
}];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;