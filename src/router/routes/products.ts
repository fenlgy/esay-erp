export default {
  path: "/goods",
  children: [
    {
      path: "detail/:id*",
      name: "goods-detail",
      component: () => import("@/views/goods/edit.vue"),
      meta: {
        title: "商品管理详情"
      }
    },
    {
      path: "list",
      name: "goods-list",
      component: () => import("@/views/goods/list.vue"),
      meta: {
        title: "商品管理列表"
      }
    }
  ]
};