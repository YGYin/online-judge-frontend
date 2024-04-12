<template>
  <div id="manageProblemView">
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
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="updateRecord(record)"
            >Edit
          </a-button>
          <a-button status="danger" @click="deleteRecord(record)"
            >Delete
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Problem, ProblemControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const show = ref(true);

const dbDataList = ref([]);
const totalNum = ref(0);
const searchConfig = ref({
  pageSize: 10,
  current: 1,
});

const loadDbData = async () => {
  const result = await ProblemControllerService.listProblemByPageUsingPost(
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
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "题目内容",
    dataIndex: "content",
  },
  {
    title: "题目答案",
    dataIndex: "res",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acNum",
  },
  {
    title: "测试用例",
    dataIndex: "testCase",
  },
  {
    title: "测试配置",
    dataIndex: "testConfig",
  },
  {
    title: "用户 ID",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const router = useRouter();

const updateRecord = (problem: Problem) => {
  router.push({
    path: "/update/problem",
    query: {
      id: problem.id,
    },
  });
};
const deleteRecord = async (problem: Problem) => {
  const result = await ProblemControllerService.deleteProblemUsingPost({
    id: problem.id,
  });
  if (result.code === 0) {
    message.success("题目删除成功");
    loadDbData();
  } else {
    message.error("题目删除失败");
  }
};

const onPageChange = (page: number) => {
  // 取得 page，用新的 page number 覆盖旧的页号
  searchConfig.value = {
    ...searchConfig.value,
    current: page,
  };
};
</script>

<style scoped>
addProblemView {
}
</style>
