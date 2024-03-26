import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes";

// 路由根据不同地址动态加载页面
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
