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
import { onMounted } from "vue";

// 预留全局项目入口
const doInit = () => {
  console.log("YG's Online Judge");
};

onMounted(() => {
  doInit();
});
</script>
