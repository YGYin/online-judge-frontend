<template>
  <div id="browseProblemView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="problem">
          <a-tab-pane key="problem" title="题目">
            <a-card v-if="curProblem" :title="curProblem.title">
              <a-descriptions
                title="通过条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ curProblem.testConfig.timeLimit ?? 0 }}ms
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ curProblem.testConfig.memLimit ?? 0 }}kb
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="curProblem.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of curProblem.tags"
                    :key="index"
                    color="blue"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="answer" title="题解"> Answer Page</a-tab-pane>
          <a-tab-pane key="comment" title="评论"> Comment Page</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="submitForm" layout="inline">
          <a-form-item field="title" label="语言" style="min-width: 250px">
            <a-select
              v-model="submitForm.language"
              :style="{ width: '320px' }"
              placeholder="Please select language"
            >
              <a-option>cpp</a-option>
              <a-option>java</a-option>
              <a-option>go</a-option>
              <a-option>python</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <MonacoCoder
          :value="submitForm.code"
          :language="submitForm.language"
          :handle-change="onCodeChange"
        />
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps } from "vue";
import {
  ProblemControllerService,
  ProblemSubmitAddRequest,
  ProblemSubmitControllerService,
  ProblemVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import MonacoCoder from "@/components/MonacoCoder.vue";
import MdViewer from "@/components/MdViewer.vue";

interface Properties {
  id: string;
}

const properties = withDefaults(defineProps<Properties>(), {
  id: () => "",
});

const curProblem = ref<ProblemVO>();

const loadDbData = async () => {
  // 根据 id 来获取脱敏的题目信息
  const result = await ProblemControllerService.getProblemVoByIdUsingGet(
    properties.id as any
  );
  if (result.code === 0) {
    // 用返回值填充 problem
    curProblem.value = result.data;
  } else {
    message.error("题目加载失败，" + result.message);
  }
};

// 当页面加载出来后获取后端数据
onMounted(() => {
  loadDbData();
});

const submitForm = ref<ProblemSubmitAddRequest>({
  language: "java",
  code: "",
});

// todo: 代码编辑器未能正确高亮所有语言
// 提交题目的代码
const doSubmit = async () => {
  if (!curProblem.value?.id) {
    return;
  }
  const result = await ProblemSubmitControllerService.doProblemSubmitUsingPost({
    ...submitForm.value,
    problemId: curProblem.value.id,
  });
  if (result.code === 0) {
    message.success("题目提交成功");
  } else {
    message.error("题目提交失败，" + result.message);
  }
};

const onCodeChange = (val: string) => {
  submitForm.value.code = val;
};

const router = useRouter();
</script>

<style>
#browseProblemView {
  max-width: 1450px;
  margin: 0 auto;
}

#browseProblemView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
