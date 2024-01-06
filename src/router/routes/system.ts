export default {
  path: "/system",
  children: [
    {
      path: "system-config",
      name: "system-config",
      component: () => import("@/views/system/system-config/index.vue"),
      meta: {
        title: "系统配置"
      }
    },
    {
      path: "warehouse-config",
      name: "warehouse-config",
      component: () => import("@/views/system/warehouse/list.vue"),
      meta: {
        title: "仓库配置"
      }
    },
    {
      path: "unit-config",
      name: "unit-config",
      component: () => import("@/views/system/unit/list.vue"),
      meta: {
        title: "单位管理"
      }
    },
  ]
};