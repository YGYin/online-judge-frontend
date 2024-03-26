<template>
  <div id="app">
    <CommonLayout />
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import CommonLayout from "@/layouts/CommonLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";

// 预留全局项目入口
const doInit = () => {
  console.log("YG's Online Judge");
};

onMounted(() => {
  doInit();
});

const router = useRouter();
const store = useStore();

router.beforeEach((to, from, next) => {
  // 加入全局路由拦截，判断当前用户是否有权限访问 admin
  if (to.meta?.access === "isAdmin") {
    if (store.state.user.loginUser?.userRole !== "admin") {
      next("/authDenied");
      return;
    }
  }
  next();
});
</script>
