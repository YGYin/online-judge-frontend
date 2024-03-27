import router from "@/router";
import store from "@/store";
import AUTH_ENUM from "@/auth/authEnum";
import checkAuth from "@/auth/checkAuth";

router.beforeEach(async (to, from, next) => {
  console.log("登录用户信息", store.state.user.loginUser);
  // 加入全局路由拦截，判断当前用户是否有权限访问 admin
  // if (to.meta?.access === "isAdmin") {
  //   if (store.state.user.loginUser?.userRole !== "admin") {
  //     next("/authDenied");
  //     return;
  //   }
  // }

  const loginUser = store.state.user.loginUser;
  // 没有信息则之前未登录过或者首次登录，执行自动登录，
  // 调用 user 中的 getLoginUser
  if (!loginUser || !loginUser.userRole) {
    // 等用户登录成功后再执行后续 block
    await store.dispatch("user/getLoginUser");
  }

  // 获取所需权限
  const authInNeed = (to.meta?.access as string) ?? AUTH_ENUM.NOT_LOGIN;
  // 对于需要登录才能浏览的页面，没登录跳转到登录页面，并重定向
  if (authInNeed !== AUTH_ENUM.NOT_LOGIN) {
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 已登录，走检验权限，没权限跳转到对应页面
    if (!checkAuth(loginUser, authInNeed)) {
      next("/authDenied");
      return;
    }
  }

  next();
});
