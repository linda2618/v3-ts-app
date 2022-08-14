import axios from "axios";
import { ElMessage } from "element-plus";

enum msgs {
  "操作成功" = 200,
  "密码错误",
  "账号错误",
  "请求异常",
}
//创建http实例
const $http = axios.create({
  // baseURL: "http://127.0.0.1:8888/api/private/v1/",
  baseURL:
    "https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

//请求拦截(request 拦截器)
$http.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  if (config.headers.token) {
    config.headers.token = window.sessionStorage.getItem("token") || "";
  }

  // 在最后必须return config
  return config;
});

// response 拦截器
axios.interceptors.response.use(
  (res) => {
    // code: 200,
    // data: {},
    // msg:'',
    const code: number = res.data.code;
    if (code !== 200) {
      ElMessage.error(msgs[code]);
      return Promise.reject(res.data);
    }
    return res.data;
  },
  (err) => {
    console.log(err);
  }
);
export default $http;
