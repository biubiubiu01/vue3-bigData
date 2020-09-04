import {
  createRouter,
  createWebHashHistory
} from "vue-router";

import Layout from '@/layouts'


const routes = [{
    path: "/",
    component: Layout,
    redirect: "/homepage",
    children: [{
      path: "/homepage",
      name: "homepage",
      component: () => import("../views/homepage/index.vue"),
      meta: {
        title: "首页",
        keepAlive: true
      }
    }]
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;