<script setup>
    import {
        useUserStore
    } from '../store/user.js'
    const user = useUserStore();
</script>

<template>
    <div class="text-9xl text-red-600">小弟课堂</div>
    <span>token: {{ user.token }}</span>
    <el-button type="primary" round>
        <el-icon><Select /></el-icon>
    </el-button>
</template>

<style scoped>
</style>