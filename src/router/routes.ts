import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import AuthDeniedView from "@/views/AuthDeniedView.vue";
import AUTH_ENUM from "@/auth/authEnum";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import UserLayout from "@/layouts/UserLayout.vue";

// 提取抽象出通用路由文件
export const routes: Array<RouteRecordRaw> = [
  {
    // vue-router 子路由机制，通过嵌套路由共用布局样式
    path: "/user",
    name: "user",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "Login",
        component: LoginView,
      },
      {
        path: "/user/register",
        name: "Register",
        component: RegisterView,
      },
    ],
    meta: {
      isHide: true,
    },
  },
  {
    path: "/",
    name: "Problems",
    component: HomeView,
  },
  {
    path: "/hidePage",
    name: "HidePage",
    component: HomeView,
    meta: {
      isHide: true,
    },
  },
  {
    path: "/authDenied",
    name: "AuthDenied",
    component: AuthDeniedView,
  },
  {
    path: "/admin",
    name: "Administration",
    component: AdminView,
    // 加入 meta，权限管理
    meta: {
      access: AUTH_ENUM.ADMIN,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
