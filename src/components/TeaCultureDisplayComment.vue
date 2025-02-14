<template>
  <div style="height: 50px; width: 100%;" class="parent">
    <el-text size="large">{{user.username}}:
      {{ comment.content }}</el-text>
    <el-button type="primary">点赞</el-button>
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted,
    watch
  } from 'vue';
  import axios from "axios";

  const props = defineProps({
    comment: {
      type: Object,
      required: true
    },
  })
  const com = ref(JSON.parse(
    `{"commentId":1,"teaCultureId":1,"userId":1,"content":"太好喝了！","likeCount":0,"time":"2025-02-14T18:35:37.000+00:00"}`
  ))
  const user = ref(JSON.parse(
    `{"userIsNotExist":false,"userId":26,"username":"1231123","passwordHash":"202cb962ac59075b964b07152d234b70","phoneNumber":"1231231","address":"2313132","userType":"customer"}`
  ));
  watch(props.comment, (comment) => {
    com.value = comment;
  })
  onMounted(async () => {
    await axios({
      method: 'get',
      url: '/user/select-id/' + props.comment.userId,
    }).then((x) => {
      user.value = x.data;
      console.log();
    })
  })
</script>

<style scoped>
  .parent {
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 15px;
    margin-bottom: 15px;
  }
</style>