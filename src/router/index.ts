import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "order",
        name: "order",
        meta: {
          isShow: true,
          title: "订单列表",
        },
        component: () =>
          import(/* webpackChunkName: "order" */ "../views/OrderView.vue"),
      },
      {
        path: "userList",
        name: "userList",
        meta: {
          isShow: false,
          title: "用户列表",
        },
        component: () =>
          import(/* webpackChunkName: "userlist" */ "../views/UserView.vue"),
      },
      {
        path: "/roleList",
        name: "roleList",
        meta: {
          isShow: true,
          title: "角色列表",
        },
        component: () => import("../views/RoleView.vue"),
      },
      {
        path: "/authority",
        name: "authority",
        meta: {
          isShow: true,
          title: "权限列表",
        },
        component: () => import("../views/Authority.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      // 指定了相同的webpackChunkName，会合并打包成一个js文件。
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
