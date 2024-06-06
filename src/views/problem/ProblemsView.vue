<template>
  <div id="problemsView">
    <a-form :model="searchConfig" layout="inline">
      <a-form-item field="title" label="题目名称" style="min-width: 250px">
        <a-input
          v-model="searchConfig.title"
          placeholder="Please enter title"
        />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 250px">
        <a-input-tag
          v-model="searchConfig.tags"
          placeholder="Please enter tags"
        />
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
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="blue"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acRate="{ record }">
        {{
          `${
            record.submitNum ? (record.acNum / record.submitNum) * 100 : "0"
          }% (${record.acNum} / ${record.submitNum})`
        }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toProblemPage(record)">Go</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Problem,
  ProblemControllerService,
  ProblemQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const show = ref(true);

const dbDataList = ref([]);
const totalNum = ref(0);
const searchConfig = ref<ProblemQueryRequest>({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const loadDbData = async () => {
  // 此处展示题目需要返回脱敏封装后的内容
  const result = await ProblemControllerService.listProblemVoByPageUsingPost(
    searchConfig.value
  );
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
    title: "题目 ID",
    dataIndex: "id",
  },
  {
    title: "题目",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acRate",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    slotName: "optional",
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
#problemsView {
  max-width: 1280px;
  margin: 0 auto;
}

#problemsView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
