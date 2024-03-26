<template>
  <a-row id="navBarHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <!-- 绑定跳转事件，点击后跳转到对应页面 -->
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="navBarOnClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-navbar">
            <img class="title-logo" src="../assets/logo.png" />
            <div class="title-text">YG OJ</div>
          </div>
        </a-menu-item>
        <!-- 遍历路由中的 path，加载 item.name 作为内容 -->
        <a-menu-item v-for="item in displayedRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUser?.userName ?? "Please login" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAuth from "@/auth/checkAuth";
import AUTH_ENUM from "@/auth/authEnum";

// 使用 vue router 组件来做路由实现跳转
const router = useRouter();
// 获取当前登录用户信息
const store = useStore();
const loginUser = store.state.user.loginUser;
// 定义响应式变量，为当前选中菜单项，默认页面为主页
const selectedKeys = ref(["/"]);

// 显隐 filter：定义菜单需要被展示部份的路由数组，返回 true 代表要保留显示
// 使用 compute 属性是的登录用户发生变更时，使得菜单栏重新渲染
// eslint-disable-next-line vue/return-in-computed-property
const displayedRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.isHide) {
      return false;
    }
    // 根据设定的权限来过滤菜单显示项
    return checkAuth(store.state.user.loginUser, item?.meta?.access as string);
  });
});

// 路由更新跳转后，把路由信息同步更新到菜单的高亮状态上
router.afterEach((to, from, next) => {
  selectedKeys.value = [to.path];
});

// 点击菜单后，更新跳转路由
const navBarOnClick = (key: string) => {
  router.push({
    // router 根据点击 navBar 获取到的 key 指定跳转到对应路径
    path: key,
  });
};

console.log();

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "YG",
    userRole: AUTH_ENUM.ADMIN,
  });
}, 3000);
</script>

<style scoped>
.title-navbar {
  display: flex;
  align-items: center;
}

.title-text {
  margin-left: 16px;
}

.title-logo {
  height: 48px;
}
</style>
