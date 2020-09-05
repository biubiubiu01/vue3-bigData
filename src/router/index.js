import { createRouter, createWebHashHistory } from "vue-router";

import Layout from "@/layouts";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/homepage",
    children: [
      {
        path: "/homepage",
        name: "homepage",
        component: () => import("../views/homepage/index.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/more",
        name: "more",
        component: () => import("../views/more/index.vue"),
        meta: {
          title: "更多",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
