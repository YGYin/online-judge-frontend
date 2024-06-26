<template>
  <div
    id="monaco-coder"
    ref="monacoCoderRef"
    style="min-height: 400px; height: 75vh"
  />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { ref, onMounted, toRaw, withDefaults, defineProps, watch } from "vue";

// 定义组件属性类型让代码编辑器的值在其他组件中可以被获取
// 让父级控制 editor 内部的 value 和 handleChange
interface Properties {
  value: string;
  language?: string;
  handleChange: (val: string) => void;
}

// 输入文本后会触发 handleChange 方法
// 给组件指定变量的实际初始值
const properties = withDefaults(defineProps<Properties>(), {
  value: () => "",
  language: () => "java",
  handleChange: (val: string) => {
    console.log(val);
  },
});

const monacoCoderRef = ref();
const monacoCoder = ref();

watch(
  () => properties.language,
  () => {
    // 判断编辑器实例是否有初始化
    if (monacoCoder.value) {
      monaco.editor.setModelLanguage(
        toRaw(monacoCoder.value).getModel(),
        properties.language
      );
    }
  }
);

// 初始化时执行
onMounted(() => {
  if (!monacoCoderRef.value) {
    return;
  }
  monacoCoder.value = monaco.editor.create(monacoCoderRef.value, {
    value: properties.value,
    language: properties.language,
    minimap: {
      enabled: true,
    },
    automaticLayout: true,
    readOnly: false,
    theme: "vs-dark",
  });

  // 用于监听编辑器内容变化
  monacoCoder.value.onDidChangeModelContent(() => {
    properties.handleChange(toRaw(monacoCoder.value).getValue());
  });
});

// 需要先把编辑器挂载到一个元素上
</script>

<style scoped></style>
