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
                    <div>
                        <el-image class="photo" :src="src" />
                    </div>
                    <div class="window">
                        <div style="margin: 20px; margin-left: 0px;">
                            <el-text id="market_text"
                                class="text-5xl text-zinc-950 hover:text-green-600 font-extrabold">欢迎光临茶叶商城</el-text>
                        </div>

                        <div style="margin: 0 auto; width: 100%; text-align:center;">
                            <div class="c">
                                <el-text class="mx-1" type="primary">账号</el-text><br />
                            </div>

                            <el-input v-model="account" placeholder="请输入账号" @input="allNumber(account)" /><br /><br />
                            <div class="c">
                                <el-text class="mx-1" type="primary">密码</el-text><br />
                            </div>
                            <el-input v-model="password" type="password" placeholder="请输入密码"
                                show-password /><br /><br />

                            <div class="flex-container">
                                <el-checkbox v-model="checked">
                                    我同意<el-link href="https://www.mihoyo.com/company/privacy"
                                        target="_blank"><b>用户协议</b></el-link>
                                </el-checkbox>
                            </div>
                            <div class="to_submit">
                                <el-button type="success" @click="router.push('/register');">前往注册</el-button>
                                <el-button type="primary" @click="tryLogin()" :disabled="!checked">确认登录</el-button>
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
        ref,
        getCurrentInstance,
        onMounted
    } from 'vue';
    const account = ref("");
    const password = ref("")

    import router from './../router/router.js';

    import {
        ElMessageBox
    } from 'element-plus'
    const src =
        'https://fastcdn.mihoyo.com/content-v2/nap/102198/7dc8e490e0e15e0656458003241b94ad_8371389282001677330.png'
    const dialogVisible = ref(true)
    const checked = ref(true)

    onMounted(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            const userInfo = JSON.parse(storedUserInfo);
            // console.log(userInfo);
            router.push('/customerhomepage');
        } else {
            console.log('未找到用户信息');
        }
    })

    const handleClose = () => {
        dialogVisible.value = false;
    }

    const allNumber = (value) => {
        value = value.replace(/[^\d]/g, "")
        account.value = value
    }

    const {
        proxy
    } = getCurrentInstance();

    var userInfo;

    const tryLogin = async () => {
        try {
            const res = await proxy.$axios.post('/user/select-user-by-id-and-password/', {
                userId: account.value,
                password: password.value
            });
            // console.log(res.data);
            userInfo = res.data;
            if (userInfo.userIsNotExist) {
                await alert("账户或密码错误！");
            } else {
                // account.value = userInfo.username;
                // password.value = userInfo.passwordHash;
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                alert("登录成功！");
                router.push('/customerhomepage');
            }


            // if (typeof res.data === 'object' && res.data !== null && !Array.isArray(res.data)) {
            //     console.log('res.data 是一个对象');
            // } else if (typeof res.data === 'string') {
            //     console.log('res.data 是一个字符串');
            // } else {
            //     console.log('res.data 既不是对象也不是字符串');
            // }

        } catch (err) {
            console.error('错误详情:', err.response?.data || err.message)
        }
    }
</script>

<style scoped>
    .common-layout {
        /* background-image: url('https://i0.hippopx.com/photos/1015/217/316/tea-leaf-china-green-f78462261f295a41b4d8473a4924c0b8.jpg'); */
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
        margin-bottom: 60px;
        padding-bottom: 10px;
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
        align-items: center;
        /* background-color: aqua; */
        padding-left: 60px;
        height: 90vh;
        padding-top: 0px;
    }

    .window {
        padding: 20px;
        border-radius: 25px;
        background-color: gray;
        height: 500px;
        background: white;
    }
</style>