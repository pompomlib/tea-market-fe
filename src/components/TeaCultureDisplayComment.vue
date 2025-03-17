<template>
  <div style="height: 50px; width: 100%;" class="parent">
    <el-text size="large">{{user.username}}:
      {{ comment.content }}</el-text>
    <el-button type="primary" @click="likeIt()"><el-icon>
        <Lollipop />
      </el-icon>{{comment.likeCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{is_first?"点赞":"取消点赞"}}</el-button>
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



  const user = ref(JSON.parse(
    `{"userIsNotExist":false,"userId":26,"username":"1231123","passwordHash":"202cb962ac59075b964b07152d234b70","phoneNumber":"1231231","address":"2313132","userType":"customer"}`
  ));

  onMounted(async () => {
    await axios({
      method: 'get',
      url: '/user/select-id/' + props.comment.userId,
    }).then((x) => {
      user.value = x.data;
      console.log(user.value);
    })
  })

  const is_first = ref(true);
  const likeIt = async () => {
    await axios({
      method: 'post',
      url: '/tea-culture/like-count-add-sub',
      data: {
        comment_id: props.comment.commentId,
        is_like: is_first.value
      }
    })
    is_first.value ? props.comment.likeCount++ : props.comment.likeCount--;
    is_first.value = !is_first.value;
  }
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