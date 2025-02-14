<template>
  <div class="common-layout">
    <el-container>
      <el-header style="background-color: blueviolet;">Header</el-header>
      <el-container style="height: auto;">
        <el-aside width="200px" style="">Aside</el-aside>
        <el-main style="padding: 10px; border: 2px solid red;">
          <el-tabs :tab-position="tabPosition" class="demo-tabs">

            <el-tab-pane label="茶文化交流">
              <ShareTeaCultureVue></ShareTeaCultureVue>
            </el-tab-pane>


            <el-tab-pane label="浏览商品">
              <el-scrollbar height="80vh">
                <ProductView v-for="item in product" :key="item.productId" :item="item" :current_user="the_current_user"
                  v-if="product" />
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="购物车">
              <el-button type="primary" @click="get_all_items_in_shopping_cart()">更新购物车</el-button>
              <el-button type="primary" @click="()=>{get_all_selected_items();}">结算所有已勾选的订单</el-button>
              <el-button type="primary" @click="delete_all()">移除所有已勾选的订单</el-button>
              <el-button type="info" @click="print()">打印所有数据</el-button>
              <el-divider></el-divider>
              <el-scrollbar height="75vh" v-if="items_list_in_shopping_cart">
                <ShoppingCartItem v-for="item in items_list_in_shopping_cart" :key="item.shoppingCartId" :item="item"
                  :current_user="the_current_user"></ShoppingCartItem>
              </el-scrollbar>
              <div style="height: 20vh; margin: 0px; padding: 0px;"></div>
            </el-tab-pane>
            <el-tab-pane label="订单管理">订单管理</el-tab-pane>
            <el-tab-pane label="评价管理">评价管理</el-tab-pane>

            <el-tab-pane label="投诉管理">投诉管理</el-tab-pane>
          </el-tabs>
        </el-main>
        <el-aside width="200px" style="">Aside</el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import ProductView from './../components/productview.vue';
  import ShoppingCartItem from './../components/ShoppingCartItem.vue';
  import ShareTeaCultureVue from '../components/ShareTeaCulture.vue';
  import { ref, onMounted, provide, getCurrentInstance, onUnmounted } from 'vue';
  import axios from 'axios';
  axios.defaults.baseURL = 'http://localhost:9099/';
  import type { TabsInstance } from 'element-plus';
  import {
    ElMessage,
    ElMessageBox
  } from 'element-plus'
  const tabPosition = ref<TabsInstance['tabPosition']>('right');

  async function wait(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const product = ref([]);
  const the_current_user = ref(null);
  onMounted(async () => {
    the_current_user.value = JSON.parse(localStorage.getItem("userInfo"));
    console.log(the_current_user.value);

    await wait(500);
    try {
      const res = await axios.get('/tea/getTeaProductList')
      product.value = res.data
      console.log('已更新产品数据:', product.value)
    } catch (error) {
      console.error('请求失败:', error)
    }
    finally {
      await wait(1000);
    }
    await get_all_items_in_shopping_cart();
  })

  const all_selected_items = ref([])
  const get_all_selected_items = () => {
    all_selected_items.value = [];
    for (var i = 0; i < items_list_in_shopping_cart.value.length; i++) {
      if (items_list_in_shopping_cart.value[i].isSelected) {
        all_selected_items.value.push(items_list_in_shopping_cart.value[i]);
      }
    };
    console.log(all_selected_items.value);
  }
  const purchase_all = () => {
    get_all_selected_items();
  }
  const delete_all = async () => {
    axios({
      method: 'post',
      url: '/shopping-cart/del-all-selected',
      data: { user_id: + the_current_user.value.userId },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      if (res.data.isSuccess) {
        ElMessage({
          type: 'success',
          message: `删除成功`,
        });
        get_all_items_in_shopping_cart();
      } else {
        ElMessage({
          type: 'error',
          message: `删除失败`,
        })
      }
    })

  }

  const del_this = async () => {
    await get_all_items_in_shopping_cart().then(() => {
      ElMessage({
        type: 'success',
        message: `删除成功`,
      })
    })
  };

  provide("del_this", del_this);

  const print = () => {
    console.log(items_list_in_shopping_cart.value);
  }

  const items_list_in_shopping_cart = ref([]);
  const get_all_items_in_shopping_cart = async () => {
    await axios({
      method: 'get',
      url: '/shopping-cart/get-all-items-by-id/' + the_current_user.value.userId
    }).then((res) => {
      items_list_in_shopping_cart.value = res.data;
      console.log(res.data)
    })
    await wait(1000);
  }
</script>

<style>
  .demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }

  .el-tabs--right .el-tabs__content,
  .el-tabs--left .el-tabs__content {
    height: 100%;
  }
</style>