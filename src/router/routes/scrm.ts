export default {
  path: "/scrm",
  children: [
    {
      path: "list",
      name: "scrm-list",
      component: () => import("@/views/scrm/list.vue"),
      meta: {
        title: "系统配置"
      }
    },
  ]
};