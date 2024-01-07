export default {
  path: "/scrm",
  children: [
    {
      path: "list",
      name: "scrm-list",
      component: () => import("@/views/scrm/list.vue"),
      meta: {
        title: "客商管理"
      }
    },
    {
      path: "edit/:id*",
      name: "scrm-edit",
      component: () => import("@/views/scrm/edit.vue"),
      meta: {
        title: "客商编辑"
      }
    },
  ]
};