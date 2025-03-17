<template>
  <el-card style="">
    <div style="height: auto; width: 100%; text-align: center; margin-bottom: 40px;">
      <span style="font-size: 24px;" v-if="tc.title">{{tc.title}}</span>
      <el-divider>{{release_user.username}} &nbsp;&nbsp;发布于{{tc.date}}
      </el-divider>
    </div>
    <el-text v-for="x in splited_article_arr">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{x}}<br /></el-text>
    <div style="text-align: center;">
      <el-image style="width: 50%;" v-if="tc.photo != 'owo' &&  tc.photo != null" :src="tc.photo"></el-image>
    </div>

    <div style="padding: 5px;" v-if="item.productId != -1">
      <hr />
      <ProductView :item="item" :current_user="user"></ProductView>
    </div>
    <template #footer>
      <div>
        <p>评论</p>
        <div style="display: flex; flex-direction: row; margin-bottom: 10px;">
          <el-input v-model="comment_content"></el-input>
          <el-button style="margin-left: 20px;" type="success" @click="send()">发送</el-button>
          <el-button type="primary" @click="change_sort_way(3)">按点赞数降序排序</el-button>
          <el-button type="primary" @click="change_sort_way(1)">按时间升序排序</el-button>
          <el-button type="primary" @click="change_sort_way(2)">按时间降序排序</el-button>
        </div>
      </div>
      <el-scrollbar max-height="430px">
        <TeaCultureDisplayComment v-if="comment_list != []" v-for="i in comment_list" :comment="i" :user="user"
          :key="i.commentId">
        </TeaCultureDisplayComment>
      </el-scrollbar>
    </template>
  </el-card>
</template>

<script setup>
  import {
    onMounted,
    ref,
    defineModel,
    watch
  } from "vue";
  import {
    get_splited_article
  } from "./../JS/tea_culture.js"
  import ProductView from './../components/productview.vue';
  import TeaCultureDisplayComment from './../components/TeaCultureDisplayComment.vue';
  import axios from "axios";
  import {
    ElMessage
  } from 'element-plus'



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
    `{"tcId":1,"userId":1,"teaProductId":2,"date":"2025-02-14T16:59:15.000+00:00","title":"","paragraph":"茶韵悠悠，岁月凝香。","photo":"owo"}`
  ));
  const release_user = ref(JSON.parse(
    `{"userIsNotExist":false,"userId":26,"username":"1231123","passwordHash":"202cb962ac59075b964b07152d234b70","phoneNumber":"1231231","address":"2313132","userType":"customer"}`
  ));

  const comment_list = ref([]);
  const tc_index = defineModel('tc_index');


  onMounted(async () => {
    console.log("onMounted: " + tc_index.value);
    await axios({
      method: 'get',
      url: '/tea-culture/get-arcticle-by/' + tc_index.value,
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
      }).then((x) => {
        release_user.value = x.data;
        console.log();
      })
      await axios({
        method: 'get',
        url: 'tea-culture/get-comments-by-tc-id/' + tc.value.tcId + '/1'
      }).then((y) => {
        comment_list.value = y.data;
        console.log(comment_list.value);
      })
    }).catch(() => {
      console.log("/tea-culture/get-one-article error!");
    })
  })

  watch(tc_index, async (new_v, old_v) => {
    await axios({
      method: 'get',
      url: '/tea-culture/get-arcticle-by/' + new_v,
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
      }).then((x) => {
        release_user.value = x.data;
        console.log();
      })
      await axios({
        method: 'get',
        url: 'tea-culture/get-comments-by-tc-id/' + tc.value.tcId + '/1'
      }).then((y) => {
        comment_list.value = y.data;
        console.log(comment_list.value);
      })
    }).catch(() => {
      console.log("/tea-culture/get-one-article error!");
    })
  });

  const comment_content = ref(null);
  const send = async () => {
    await axios({
      method: 'post',
      url: '/tea-culture/insert-comment',
      data: {
        tc_id: tc.value.tcId,
        user_id: user.value.userId,
        content: comment_content.value
      }
    })
    await change_sort_way(sorted_way.value);

    console.log(comment_content.value);
    comment_content.value = "";
    ElMessage({
      message: '发送成功',
      type: 'success',
    });
  }

  const sorted_way = ref(1);
  const change_sort_way = async (val) => {
    sorted_way.value = val;
    await axios({
      method: 'get',
      url: 'tea-culture/get-comments-by-tc-id/' + tc.value.tcId + '/' + val
    }).then((y) => {
      comment_list.value = y.data;
      console.log(comment_list.value);
    })
  }
</script>

<style scoped>

</style>