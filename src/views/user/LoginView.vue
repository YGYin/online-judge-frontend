<template>
  <div class="loginView">
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="userAccount" label="Username">
        <a-input
          v-model="form.userAccount"
          placeholder="please enter your username"
        />
      </a-form-item>
      <a-form-item field="userPassword" label="Password">
        <a-input-password
          v-model="form.userPassword"
          placeholder="please enter your password"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import message from "@arco-design/web-vue/es/message";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

// 登录功能实现
// 表单信息
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

// 提交表单
const handleSubmit = async () => {
  // 使用 post 请求用户登录
  const resp = await UserControllerService.userLoginUsingPost(form);
  if (resp.code === 0) {
    alert("Login Success" + JSON.stringify(resp.data));
    // 前端请求获取登录用户信息，调用 getLoginUser
    await store.dispatch("user/getUserLogin");
    // 等待获取成功后跳转回主页，防止历史记录堆栈
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("Login Failed: " + resp.message);
  }
};
</script>
