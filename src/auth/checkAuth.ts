import AUTH_ENUM from "@/auth/authEnum";

const checkAuth = (loginUser: any, authInNeed = AUTH_ENUM.NOT_LOGIN) => {
  // 获得当前已登录用户的权限
  // 如果无法获取 loginUser 说明为登陆
  const curLoginUserAuth = loginUser?.userRole ?? AUTH_ENUM.NOT_LOGIN;
  // 对于未登录可以直接访问的内容，直接返回 true
  if (authInNeed === AUTH_ENUM.NOT_LOGIN) {
    return true;
  }
  // 对于需要用户登录后才能访问的内容，检查登录状态
  if (authInNeed === AUTH_ENUM.USER) {
    // 若用户未登录则无权限访问
    if (curLoginUserAuth === AUTH_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 对于需要管理员权限才能访问的内容
  if (authInNeed === AUTH_ENUM.ADMIN) {
    if (curLoginUserAuth !== AUTH_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAuth;
