import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getRouter } from "../http/api";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: "order",
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
          isShow: false,
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

//路由拦截
router.beforeEach(async (to) => {
  const token: string | null = sessionStorage.getItem("token");
  if (!token && to.path !== "/login") {
    return "/login";
  }
  // else if (to.path !== "/login" && token) {
  //   if (router.getRoutes().length === 3) {
  //     //动态添加路由
  //     let routerData: any = await getRouter();
  //     routerData = routerData.data;
  //     // console.log(routerData.data);

  //     routerData.forEach((v: any) => {
  //       const routerObj: RouteRecordRaw = {
  //         path: v.name,
  //         name: v.name,
  //         meta: v.meta,
  //         component: () =>
  //           import(
  //             /* webpackChunkName: "[request]" */ `../views/${v.path}.vue`
  //           ),
  //       };
  //       router.addRoute("home", routerObj);
  //     });
  //     router.replace(to.path);
  //   } else if (to.path === "/login" && token) {
  //     return "/";
  //   }
  // }
});

export default router;
