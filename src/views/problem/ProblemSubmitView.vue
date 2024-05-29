<template>
  <div id="problemSubmitView">
    <a-form :model="searchConfig" layout="inline">
      <a-form-item field="problemID" label="题目" style="min-width: 250px">
        <a-input
          v-model="searchConfig.problemId"
          placeholder="Please enter problemId"
        />
      </a-form-item>
      <a-form-item field="title" label="语言" style="min-width: 250px">
        <a-select
          v-model="searchConfig.language"
          :style="{ width: '320px' }"
          placeholder="Please select language"
        >
          <a-option>cpp</a-option>
          <a-option>java</a-option>
          <a-option>go</a-option>
          <a-option>python</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button @click="doSearch">Search</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :columns="columns"
      :data="dbDataList"
      :pagination="{
        pageSize: searchConfig.pageSize,
        current: searchConfig.current,
        showTotal: true,
        total: totalNum,
      }"
      @page-change="onPageChange"
    >
      <template #testInfo="{ record }">
        {{ JSON.stringify(record.testInfo) }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Problem,
  ProblemControllerService,
  ProblemSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const show = ref(true);

const dbDataList = ref([]);
const totalNum = ref(0);
const searchConfig = ref<ProblemSubmitQueryRequest>({
  problemId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});

const loadDbData = async () => {
  // 此处展示题目需要返回脱敏封装后的内容
  const result =
    await ProblemControllerService.listProblemSubmitByPageUsingPost({
      ...searchConfig.value,
      sortField: "createTime",
      sortOrder: "descend",
    });
  if (result.code === 0) {
    dbDataList.value = result.data.records;
    totalNum.value = result.data.total;
  } else {
    message.error("数据加载失败，" + result.message);
  }
};

// 通过分页页号改变时，触发 @page-change，searchConfig 参数发生改变
// 再监听传入函数中所有变量，searchConfig 的 page number 发生改变时触发 load 更新前端页面
watchEffect(() => {
  loadDbData();
});

// 当页面加载出来后获取后端数据
onMounted(() => {
  loadDbData();
  console.log("加载数据库数据: ", dbDataList);
});

const columns = [
  {
    title: "提交题目 ID",
    dataIndex: "id",
  },
  {
    title: "语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "testInfo",
  },
  {
    title: "判题状态",
    dataIndex: "testStatus",
  },
  {
    title: "题目 ID",
    dataIndex: "problemId",
  },
  {
    title: "提交用户 ID",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];

const router = useRouter();

// 跳转到对应做题页面
const toProblemPage = (problem: Problem) => {
  router.push({
    path: `/view/problem/${problem.id}`,
  });
};

const onPageChange = (page: number) => {
  // 取得 page，用新的 page number 覆盖旧的页号
  searchConfig.value = {
    ...searchConfig.value,
    current: page,
  };
};

const doSearch = () => {
  // 搜索后重置页码
  searchConfig.value = {
    ...searchConfig.value,
    current: 1,
  };
};
</script>

<style>
#problemSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}

#problemSubmitView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
