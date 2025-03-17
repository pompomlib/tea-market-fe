<template>
  <div class="demo-collapse">
    <div>
      <el-button @click="select(999, false)" type="primary">
        全部订单
      </el-button>
      <el-button @click="select(0, false)" type="primary">
        等待付款
      </el-button>
      <el-button @click="select(1, false)" type="primary">
        已超时
      </el-button>
      <el-button @click="select(5, false)" type="primary">
        已取消
      </el-button>
      <el-button @click="select(2, false)" type="primary">
        等待发货
      </el-button>
      <el-button @click="select(3, false)" type="primary">
        等待签收
      </el-button>
      <el-button @click="select(4, false)" type="primary">
        已完成
      </el-button>
      <el-button @click="select(999, true)" type="success">
        刷新
      </el-button>
      <hr />
    </div>
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <el-collapse-item v-if="orders != []" v-for="item in orders" :key="item.orderId" :name="item.orderId">
        <template #title>
          <el-icon class="header-icon">
            <info-filled />
          </el-icon>
          <el-text type="primary">
            订单ID：
          </el-text>
          <el-text>{{item.orderId}}</el-text>
          <el-text style="margin-left: 20px;" type="primary">
            订单状态：
          </el-text>
          <el-text>{{orderStatus(item.status)}}</el-text>&nbsp;&nbsp;&nbsp;
          <el-text type="primary">
            下单时间：
          </el-text>
          <el-text>{{item.creationTime}}</el-text>


        </template>
        <div>
          <div style="text-align: center; margin-bottom: 20px;">
            <el-text v-if="item.status == 'Finished'" type="primary">
              完成时间：
            </el-text>
            <el-text v-if="item.status == 'Finished'">{{item.settlementTime}}</el-text>&nbsp;
            <el-text type="primary">
              商品种类数量：
            </el-text>
            <el-text>{{item.totalNum}}</el-text>&nbsp;
            <el-text type="primary">
              商品总金额：
            </el-text>
            <el-text>{{item.totalAmount}}</el-text>&nbsp;
          </div>
          <el-text v-for="x in item.productInfoList" :key="x.name">
            产品：{{x.name}} <br />
            包装方式：{{x.packageStyle}} <br />数量：{{x.quantity}} <br />单价：{{x.price}} 总价格：{{x.price * x.quantity}}

            <!-- 描述：{{x.description}} -->
            <hr />
          </el-text>
          <div style="text-align: right;">
            <el-button v-if="item.status == 'Pending Payment'" @click="pay(item.orderId)"
              type="primary">结算订单</el-button>
            <el-button v-if="item.status == 'Pending Payment'" @click="async ()=>{
              await change_status(item.orderId,5);
              await select(last.value, true)
            }" type="primary">取消订单</el-button>

            <el-button v-if="item.status == 'Finished'" type="primary">评价订单</el-button>
          </div>

        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import type { CollapseModelValue } from 'element-plus'
  import { getAllOrders, orderStatus, payOrder, change_status } from './../JS/AboutOrder.js'

  const activeNames = ref(['1'])
  const handleChange = (val : CollapseModelValue) => {
    console.log(val)
  }
  const user = ref(JSON.parse(localStorage.getItem('userInfo')));
  const orders = ref([]);
  onMounted(async () => {
    orders.value = await getAllOrders(user.value.userId, 999)
    console.log(orders.value);
  })

  const pay = async (id : number) => {
    const res = await payOrder(id);
    Op(res);
    await select(last.value, true)
  }

  import { ElMessage } from 'element-plus'
  const Op = (res) => {
    ElMessage({
      message: res.message,
      type: res.isSuccess ? "success" : "error",
    })
  }

  const last = ref(null);
  const select = async (status_id : number, re : boolean) => {
    if (re) {
      orders.value = await getAllOrders(user.value.userId, last.value);
    } else {
      last.value = status_id;
      orders.value = await getAllOrders(user.value.userId, status_id);
    }
  }
</script>

<style scoped>
</style>