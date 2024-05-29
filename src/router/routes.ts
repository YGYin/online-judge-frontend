import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/SampleView.vue";
import AdminView from "@/views/AdminView.vue";
import AuthDeniedView from "@/views/AuthDeniedView.vue";
import AUTH_ENUM from "@/auth/authEnum";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import AddProblemView from "@/views/problem/AddProblemView.vue";
import ManageProblemView from "@/views/problem/ManageProblemView.vue";
import ProblemsView from "@/views/problem/ProblemsView.vue";
import ProblemSubmitView from "@/views/problem/ProblemSubmitView.vue";
import BrowseProblemView from "@/views/problem/BrowseProblemView.vue";

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
    name: "Homepage",
    component: ProblemsView,
  },
  {
    path: "/problems",
    name: "Problems",
    component: ProblemsView,
  },
  {
    path: "/problem_submit",
    name: "Submitted",
    component: ProblemSubmitView,
  },
  {
    path: "/view/problem/:id",
    name: "View Problem",
    component: BrowseProblemView,
    props: true,
    meta: {
      access: AUTH_ENUM.USER,
      isHide: true,
    },
  },
  {
    path: "/add/problem",
    name: "Add Problems",
    component: AddProblemView,
    meta: {
      access: AUTH_ENUM.USER,
    },
  },
  {
    path: "/update/problem",
    name: "Update Problems",
    component: AddProblemView,
    meta: {
      access: AUTH_ENUM.USER,
      isHide: true,
    },
  },
  {
    path: "/manage/problem",
    name: "Management",
    component: ManageProblemView,
    meta: {
      access: AUTH_ENUM.ADMIN,
    },
  },
  // {
  //   path: "/hidePage",
  //   name: "HidePage",
  //   component: HomeView,
  //   meta: {
  //     isHide: true,
  //   },
  // },
  {
    path: "/authDenied",
    name: "AuthDenied",
    component: AuthDeniedView,
    meta: {
      isHide: true,
    },
  },
  // {
  //   path: "/admin",
  //   name: "Administration",
  //   component: AdminView,
  //   // 加入 meta，权限管理
  //   meta: {
  //     access: AUTH_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];
