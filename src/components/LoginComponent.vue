<template>
    <el-dialog v-model="dialogVisible" title="登录" width="500" :before-close="handleClose">
        <div class="parent">
            <div>
                <el-image :src="src"></el-image>
            </div>

            <div>
                <el-text class="mx-1" type="primary">账号</el-text><br />
                <el-input v-model="account" style="width: 240px" placeholder="请输入账号"
                    @input="allNumber(account)" /><br />

                <el-text class="mx-1" type="primary">密码</el-text><br />
                <el-input v-model="password" style="width: 240px" type="password" placeholder="请输入密码"
                    show-password /><br />

                <div class="flex-container">
                    <el-checkbox v-model="checked">
                        我同意
                    </el-checkbox>
                    <el-link href="https://www.mihoyo.com/company/privacy" target="_blank"><b>用户协议</b></el-link>
                </div>

            </div>
        </div>


        <template #footer>
            <div class="dialog-footer">
                <el-button type="success" @click="">前往注册</el-button>
                <el-button @click="dialogVisible = false">取消登录</el-button>
                <el-button type="primary" @click="tryLogin()" :disabled="!checked">确认登录</el-button>
            </div>
        </template>
    </el-dialog>


</template>

<script setup>
    import {
        ref,
        getCurrentInstance
    } from 'vue';
    const account = ref("");
    const password = ref("")
    import {
        ElMessageBox
    } from 'element-plus'
    const src =
        'https://fastcdn.mihoyo.com/content-v2/nap/102198/7dc8e490e0e15e0656458003241b94ad_8371389282001677330.png'
    const dialogVisible = ref(true)
    const checked = ref(true)

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
            console.log(res.data);
            userInfo = res.data;
            if (userInfo.UserIsNotExist) {
                await alert("账户或密码错误！");
            } else {
                account.value = userInfo.username;
                password.value = userInfo.passwordHash;
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                alert("登录成功！");

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
    .parent {
        display: flex;
        /* 子元素水平排列 */
        flex-direction: row;
        /* 给子元素之间添加间距 */
        gap: 20px;
        /* 垂直居中对齐子元素 */
        align-items: center;
    }

    .flex-container {
        display: flex;
        /* 让子元素垂直居中对齐，保证高度一致 */
        align-items: center;
    }
</style>