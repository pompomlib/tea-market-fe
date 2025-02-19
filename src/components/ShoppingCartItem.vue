<template>
  <div style="margin: 10px;">
    <el-card shadow="always" style="background-color: #E5EAF3;">
      <div style="display: flex; flex-direction: row; height: auto;">
        <div style="width: 20%;">
          <el-image :src='item.imageBase64'></el-image>
        </div>
        <div style="width: 60%; border-right: 1px solid black;">
          <div style="display: flex; flex-direction: column; margin-left: 20px;">
            <el-descriptions :title="item.productName" direction="vertical" border>
              <el-descriptions-item label="购买数量（斤）">
                <el-input-number @change="data_changed()" size="small" v-model="item.quantity" :precision="3"
                  :step="0.1" :max="item.stock" />
              </el-descriptions-item>
              <el-descriptions-item label="包装样式&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">
                <el-select @change="data_changed()" v-model="item.packageStyle" placeholder="选择包装" size="small"
                  style="width: 100%;">
                  <el-option v-for="op_item in options" :key="op_item.value" :label="op_item.label"
                    :value="op_item.value" />
                </el-select>
              </el-descriptions-item>
              <el-descriptions-item label="单价（元/斤）">
                <el-tag style="width: 100%;" type="warning"> {{item.price}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="总价（元）">
                <el-tag style="width: 100%;" type="warning">{{total_price}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="">
                <el-button type="danger" @click="()=>{_delete_this = true; data_changed(); del_this();}">删除</el-button>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        <div
          style="width: 19%; height: auto; text-align: center; display: flex; justify-content: center;  place-items: center;">
          <div style="display: flex; flex-direction: column;">
            <el-tag type="warning">{{total_price}}
              元</el-tag>
            <el-checkbox @change="data_changed()" v-model="item.selected" label="参与结算" size="large" />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import {
    ref,
    computed,
    onMounted,
    inject
  } from 'vue';
  const del_this = inject("del_this");

  const options = [{
      value: '默认包装',
      label: '默认包装'
    },
    {
      value: '高端商务',
      label: '高端商务'
    },
    {
      value: '精致礼品',
      label: '精致礼品'
    },
    {
      value: '环保简约',
      label: '环保简约'
    },
    {
      value: '复古经典',
      label: '复古经典'
    }
  ];

  const props = defineProps({
    item: {
      type: Object,
      required: true
    },
    current_user: {
      type: Object,
      required: true
    }
  })

  const _delete_this = ref(false);

  const data_changed = async () => {
    await axios({
      method: 'post',
      url: '/shopping-cart/update-package-style',
      data: {
        shopping_cart_id: props.item.shoppingCartId,
        quantity: props.item.quantity,
        style: props.item.packageStyle,
        is_selected: props.item.selected,
        delete_this: _delete_this.value,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then()
  }

  const total_price = computed(() => {
    const quantity = props.item.quantity !== null ? props.item.quantity : 0;
    const price = props.item.price !== null ? props.item.price : 0;
    return quantity * price;
  });
</script>

<style scoped>
</style>