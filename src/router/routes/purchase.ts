export default {
  path: "/purchase",
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
      path: "order",
      name: "purchase-order",
      children:[
        {
          path: "list",
          name: "purchase-order-list",
          component: () => import("@/views/purchase/orders/list.vue"),
          meta: {
            title: "商品管理列表"
          }
        }
      ]
    }
  ]
};