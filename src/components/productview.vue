<template>
  <div>
    <el-descriptions direction="vertical" border style="margin-top: 10px">
      <el-descriptions-item :rowspan="2" :width="300" label="茶叶图片" align="center">
        <el-image style="width: 100px; height: 100px" :src='item.imageBase64' />
      </el-descriptions-item>
      <el-descriptions-item align="center" label="茶叶名" :width="300">{{item.productName}}</el-descriptions-item>
      <el-descriptions-item label="茶叶单价(元/斤)" align="center">{{item.price}}</el-descriptions-item>
      <el-descriptions-item label="茶叶产地" align="center">{{item.origin}}</el-descriptions-item>
      <el-descriptions-item label="茶叶库存(斤)" align="center">
        {{item.stock}}
      </el-descriptions-item>

      <el-descriptions-item label="茶叶描述">
        {{item.description}}
        <!-- <el-divider></el-divider> -->
        <div style="text-align: right; padding-top: 20px;">
          <el-button type="primary" @click="addToShoppingCart()">加入购物车</el-button>
          <el-button type="primary">xxx</el-button>
          <el-button type="primary">xxx</el-button>
          <el-button type="primary">xxx</el-button>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
  import {
    ref,
    onMounted
  } from "vue";

  import {
    ElMessage,
    ElMessageBox
  } from 'element-plus'
  import axios from "axios";


  const props = defineProps({
    item: {
      type: Object,
      required: true
    }, current_user: {
      type: Object,
      required: true
    }
  })

  onMounted(async () => {

  })

  const addToShoppingCart = () => {
    ElMessageBox.prompt('请输入需要购买的数量（斤）：', '购买确认', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      // 正则表达式：匹配非负的整数或小数点后最多三位的浮点数
      inputPattern: /^\d+(\.\d{1,3})?$/,
      inputErrorMessage: '输入不合法（仅允许非负整数或最多三位小数的浮点数）',
    })
      .then(({
        value
      }) => {
        if (value <= props.item.stock) {
          axios({
            method: 'post',
            url: '/shopping-cart/insert-or-update-item',
            data: {
              user_id: props.current_user.userId,
              product_id: props.item.productId,
              quantity: value
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if (res.data.isSuccess) {
              ElMessage({
                type: 'success',
                message: `你已经将【${value}斤】的【${props.item.productName}】 加入到购物车`,
              })
            }
          })
        }
        else {
          ElMessage({
            type: 'error',
            message: `购买数量【${value}斤】超过库存【${props.item.stock}斤】`,
          })
        }

      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Input canceled',
        })
      })
  }
</script>

<style scoped>
</style>