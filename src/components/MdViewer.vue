<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";
import { withDefaults, defineProps } from "vue";

// 定义组件属性类型让编辑器的值在其他组件中可以被获取
// 让父级控制 editor 内部的 value 和 handleChange
interface Properties {
  value: string;
}

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];

// 输入文本后会触发 handleChange 方法
// 给组件指定初始值
const properties = withDefaults(defineProps<Properties>(), {
  value: () => "",
});
</script>

<style></style>
