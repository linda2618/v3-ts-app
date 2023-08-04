import $http from "./index";

interface loginData {
  username: string;
  password: string;
}

export const login = (data: loginData) =>
  $http({ url: "/login", method: "post", data });
export const getList = (data: any) =>
  $http({ url: "/getList", method: "get", data });
  //角色列表
export const getRoleList = () => $http({ url: "/getRoleList", method: "get" });
//用户列表
export const getUserList = () => $http({ url: "/getUserList", method: "get" });
//权限列表
export const geTauthority = () =>
  $http({ url: "/geTauthority", method: "get" });
  
export const getRouter = () => $http({ url: "/getRouter", method: "get" });
