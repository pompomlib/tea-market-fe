<template>
  <el-card style="">
    <div style="height: auto; width: 100%; text-align: center; margin-bottom: 40px;">
      <span style="font-size: 24px;" v-if="tc.title">{{tc.title}}</span>
      <el-divider>{{release_user.username}}
      </el-divider>
      <!-- <el-button size="small" style="margin-right: 24px;" type="primary">关注</el-button>{{tc.date}} -->
    </div>
    <el-text v-for="x in splited_article_arr">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{x}}<br /></el-text>
    <div style="padding: 5px;" v-if="item.productId != -1">
      <hr />
      <ProductView :item="item" :current_user="user"></ProductView>
    </div>
    <template #footer>
      评论
      <el-scrollbar max-height="430px">
        <TeaCultureDisplayComment v-if="comment_list != []" v-for="i in comment_list" :comment="i" :user="user">
        </TeaCultureDisplayComment>
      </el-scrollbar>
    </template>
    <!-- <div style="height: 450px;">
      <hr />
      评论
      <el-scrollbar max-height="430px">
        <TeaCultureDisplayComment v-if="comment_list != []" v-for="i in comment_list" :comment="i" :user="user">
        </TeaCultureDisplayComment>
      </el-scrollbar>

    </div> -->
  </el-card>
</template>

<script setup>
  import {
    onMounted,
    ref
  } from "vue";
  import {
    get_splited_article
  } from "./../JS/tea_culture.js"
  import ProductView from './../components/productview.vue';
  import TeaCultureDisplayComment from './../components/TeaCultureDisplayComment.vue';
  import axios from "axios";



  const splited_article_arr = ref([]);

  const item = ref({
    productId: -1,
    imageBase64: "https://images2017.cnblogs.com/blog/1009957/201802/1009957-20180202160304562-984636640.png",
    productName: "六安瓜片",
    price: 300,
    origin: "123123",
    stock: 123,
    description: "1231231",
  })

  const user = ref(JSON.parse(localStorage.getItem("userInfo")));
  const tc = ref(JSON.parse(
    `{"tcId":1,"userId":1,"teaProductId":2,"date":"2025-02-14T16:59:15.000+00:00","title":"好茶推荐！","paragraph":"茶韵悠悠，岁月凝香。","photo":"123123"}`
  ));
  const release_user = ref(JSON.parse(
    `{"userIsNotExist":false,"userId":26,"username":"1231123","passwordHash":"202cb962ac59075b964b07152d234b70","phoneNumber":"1231231","address":"2313132","userType":"customer"}`
  ));

  const comment_list = ref([]);

  onMounted(async () => {
    await axios({
      method: 'get',
      url: '/tea-culture/get-one-article'
    }).then(async (res) => {
      tc.value = res.data;
      console.log(tc.value);
      splited_article_arr.value = get_splited_article(tc.value.paragraph)
      if (res.data.teaProductId != null) {
        await axios({
          method: 'get',
          url: '/tea/get-product-by-id/' + res.data.teaProductId
        }).then((r) => {
          item.value = r.data;
          console.log(item.value);
        }).catch(() => {
          console.log("/tea/get-product-by-id/ error!");
        })
      }
      await axios({
        method: 'get',
        url: '/user/select-id/' + tc.value.userId,
      })
      await axios({
        method: 'get',
        url: '/user/select-id/' + tc.value.userId,
      }).then((x) => {
        release_user.value = x.data;
        console.log();
      })
      await axios({
        method: 'get',
        url: 'tea-culture/get-comments-by-tc-id/' + tc.value.tcId
      }).then((y) => {
        comment_list.value = y.data;

        console.log(comment_list.value);
      })
    }).catch(() => {
      console.log("/tea-culture/get-one-article error!");
    })
  })
</script>

<style scoped>

</style>