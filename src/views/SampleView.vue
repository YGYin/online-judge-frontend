<template>
  <div class="sample">
    <MonacoCoder :value="codeVal" :handle-change="onCodeChange" />
    <MdEditor :value="mdVal" :handle-change="onMdChange" />
    <monaco-coder />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import MonacoCoder from "@/components/MonacoCoder.vue"; // @ is an alias to /src

const codeVal = ref();
const mdVal = ref();

const onMdChange = (val: string) => {
  mdVal.value = val;
};

const onCodeChange = (val: string) => {
  codeVal.value = val;
};
</script>
