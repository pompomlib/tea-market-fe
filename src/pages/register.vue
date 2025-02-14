<template>
    <div class="common-layout">
        <el-container>
            <el-header class="el-header">
                <div class="div1">
                    <el-icon size="30px" style="margin-right: 10px;">
                        <CoffeeCup />
                    </el-icon>
                    <el-text style="font-size: 35px; color: black;">茶叶商城</el-text>
                </div>

            </el-header>
            <el-main style="padding: 0px; margin: 0px;">
                <div class="main">
                    <!-- <div>
                        <el-image class="photo" :src="src" />
                    </div> -->
                    <div class="window">

                        <el-text id="market_text"
                            class="text-5xl text-zinc-950 hover:text-green-600 font-extrabold">欢迎光临茶叶商城</el-text>
                        <div class="bak">
                            <div style="margin: 0 auto; width: 100%; text-align:center;">
                                <div class="c">
                                    <el-text class="mx-1" type="primary">用户名</el-text><br />
                                </div>
                                <el-input v-model="username" placeholder="请输入用户名" /><br /><br />

                                <div class="c">
                                    <el-text class="mx-1" type="primary">密码</el-text><br />
                                </div>
                                <el-input v-model="password1" type="password" placeholder="请输入密码"
                                    show-password /><br /><br />

                                <div class="c">
                                    <el-text class="mx-1" type="primary">确认密码</el-text><br />
                                </div>
                                <el-input v-model="password2" type="password" placeholder="请输入密码"
                                    show-password /><br /><br />

                                <div class="c">
                                    <el-text class="mx-1" type="primary">手机号</el-text><br />
                                </div>
                                <el-input v-model="phoneNum" @input="allNumber(phoneNum)"
                                    placeholder="请输入手机号" /><br /><br />

                                <div class="c">
                                    <el-text class="mx-1" type="primary">地址</el-text><br />
                                </div>
                                <el-input v-model="address" placeholder="请输入地址" /><br /><br />





                                <div class="flex-container">
                                    <el-checkbox v-model="checked">
                                        我同意<el-link href="https://www.mihoyo.com/company/privacy"
                                            target="_blank"><b>用户协议</b></el-link>
                                    </el-checkbox>
                                </div>
                                <div class="to_submit">
                                    <el-button type="success" @click="router.push('/homepage');">返回登录</el-button>
                                    <el-button type="primary" @click="tryRegist()" :disabled="!checked">确认注册</el-button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </el-main>
            <!-- <el-footer class="el-footer"></el-footer> -->
        </el-container>
    </div>
</template>

<script setup>
    import {
        h,
        ref,
        getCurrentInstance,
        onMounted
    } from 'vue';
    const username = ref(null);
    const password1 = ref(null);
    const password2 = ref(null);
    const phoneNum = ref(null);
    const address = ref(null);

    import router from './../router/router.js';

    import {
        ElMessage,
        ElNotification
    } from 'element-plus'

    const checked = ref(true)

    onMounted(() => {
        // const storedUserInfo = localStorage.getItem('userInfo');
        // if (storedUserInfo) {
        //     const userInfo = JSON.parse(storedUserInfo);
        //     // console.log(userInfo);
        //     router.push('/customerhomepage');
        // } else {
        //     console.log('未找到用户信息');
        // }
    })

    const allNumber = (value) => {
        value = value.replace(/[^\d]/g, "")
        phoneNum.value = value
    }

    const {
        proxy
    } = getCurrentInstance();

    var userInfo;

    const tryRegist = async () => {
        if (username.value != null && password1.value != null && password2.value != null && phoneNum.value !=
            null && address.value != null) {
            if (password1.value != password2.value) {
                ElMessage({
                    message: '两次密码输入必须一致！',
                    type: 'warning'
                })
                // alert("两次密码输入必须一致！");
            } else {
                const new_user = ref({
                    userId: null,
                    username: username.value,
                    passwordHash: password1.value,
                    phoneNumber: phoneNum.value,
                    address: address.value,
                })
                try {
                    const res = await proxy.$axios.post('/user/insert-user', new_user.value, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(res.data);
                    userInfo = res.data;
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));

                    ElNotification({
                        title: '提示',
                        message: h('i', {
                            style: 'color: teal'
                        }, '注册成功，你的UID为 ' + userInfo.userId),
                    })
                    alert("即将登录！");
                    router.push('/homepage');


                } catch (err) {
                    console.error('错误详情:', err.response?.data || err.message)
                }
            }
        } else {
            ElMessage({
                message: '你必须填写所有字段！',
                type: 'warning'
            });
        }
    }
</script>

<style scoped>
    .common-layout {
        background-image: url('https://dailybing.com/api/v1/20250209zh-cnMRK');
    }

    .mx-1 {
        font-size: 20px;
        text-align: left;
    }

    .c {
        text-align: left;
    }

    .el-header {
        height: 10vh;
        padding: 20px;
        padding-top: 15px;
        padding-bottom: 0px;
        margin: 0px;
    }

    .el-input {
        height: 40px;
        width: 100%;
    }

    .div1 {
        border-radius: 25px;
        background-color: seagreen;
        width: 100%;
        height: 100%;
        text-align: center;
        padding-top: 10px;
    }

    #market_text {
        margin: 0px;
        width: 100%;
    }

    .main {
        margin: 0px auto;
        display: flex;
        /* 子元素水平排列 */
        flex-direction: row;
        /* 给子元素之间添加间距 */
        gap: 100px;
        /* 垂直居中对齐子元素 */
        /* align-items: center; */
        /* background-color: aqua; */
        /* padding-left: 60px; */
        height: 90vh;
        padding: 0px;
    }

    .bak {
        background-color: wheat;
        margin: 50px;
        padding: 10px;
        border-radius: 25px;
    }

    .window {
        width: 35%;
        height: 100%;
        margin: 0 auto;
        padding: 0px;
        padding-top: 40px;
        border-radius: 25px;
        /* background-color: blue; */
        /* height: 500px; */
        /* background: white; */
        text-align: center;
    }

    .photo {

        width: 800px;
        border-radius: 25px;
        margin-right: 50px;
    }

    .el-footer {
        background-color: brown;
    }
</style>