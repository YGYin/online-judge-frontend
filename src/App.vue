<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <CommonLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import CommonLayout from "@/layouts/CommonLayout.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
// 预留全局项目入口
const doInit = () => {
  console.log("YG's Online Judge");
};

onMounted(() => {
  doInit();
});
</script>
