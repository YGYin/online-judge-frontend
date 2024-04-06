<template>
  <div id="addProblemView">
    <h2>Add Problems</h2>
    <a-form :model="form" label-align="left">
      <a-form-item field="title" label="Title">
        <a-input v-model="form.title" placeholder="please enter your title" />
      </a-form-item>
      <a-form-item field="tags" label="Tags">
        <a-input-tag
          v-model="form.tags"
          placeholder="please enter your tags..."
          allow-clear
        />
      </a-form-item>

      <a-form-item field="content" label="Content">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="res" label="Result">
        <MdEditor :value="form.res" :handle-change="onResChange" />
      </a-form-item>

      <a-form-item
        label="Judge Config"
        :content-flex="false"
        :merge-props="false"
      >
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item field="testConfig.timeLimit" label="Time Limit">
            <a-input-number
              v-model="form.testConfig.timeLimit"
              placeholder="Please enter time limit"
              min="0"
              mode="button"
              size="large"
            />
          </a-form-item>
          <a-form-item field="testConfig.memLimit" label="MeM Limit">
            <a-input-number
              v-model="form.testConfig.memLimit"
              placeholder="Please enter memory limit"
              min="0"
              mode="button"
              size="large"
            />
          </a-form-item>
          <a-form-item field="testConfig.stackLimit" label="Stack Limit">
            <a-input-number
              v-model="form.testConfig.stackLimit"
              placeholder="Please enter stack limit"
              min="0"
              mode="button"
              size="large"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item label="Test Case" :content-flex="false" :merge-props="false">
        <a-form-item
          v-for="(caseItem, index) of form.testCase"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 600px">
            <a-form-item
              :field="`form.testCase[${index}].input`"
              :label="`Input Case-${index}`"
              :key="index"
            >
              <a-input
                v-model="caseItem.input"
                placeholder="please enter test input"
              />
            </a-form-item>

            <a-form-item
              :field="`form.testCase[${index}].output`"
              :label="`Output Case-${index}`"
              :key="index"
            >
              <a-input
                v-model="caseItem.output"
                placeholder="please enter test output"
              />
            </a-form-item>
            <a-button status="danger" @click="handleDelete(index)"
              >Delete
            </a-button>
          </a-space>
        </a-form-item>

        <div style="margin-top: 20px">
          <a-button @click="handleAdd">Add Case</a-button>
        </div>
      </a-form-item>

      <a-form-item>
        <div style="margin-top: 16px" />
        <a-button
          type="primary"
          style="min-width: 95px"
          @click="addProblemSubmit"
          >Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { ProblemControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const form = reactive({
  title: "A + B",
  content: "测试题目内容",
  res: "尝试暴力破解",
  tags: ["栈", "简单"],
  testCase: [
    {
      input: "1 2",
      output: "3 4",
    },
  ],
  testConfig: {
    memLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
});

const addProblemSubmit = async () => {
  // 将 add 请求发送给后端
  console.log(form);
  const res = await ProblemControllerService.addProblemUsingPost(form);
  // 正常传输
  if (res.code === 0) {
    message.success("题目创建成功");
  } else {
    message.error("题目创建失败", res.message);
  }
};

const handleAdd = () => {
  form.testCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.testCase.splice(index, 1);
};

const onContentChange = (val: string) => {
  form.content = val;
};

const onResChange = (val: string) => {
  form.res = val;
};
</script>

<style scoped>
addProblemView {
}
</style>
