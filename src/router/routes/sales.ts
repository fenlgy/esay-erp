export default {
  path: '/sales',
  children: [
    {
      path: 'detail/:id*',
      name: 'sales-order-detail',
      component: () => import('@/views/purchase/orders/edit.vue'),
      meta: {
        title: '商品管理详情',
      },
    },
    {
      path: 'order',
      name: 'sales-order',
      children: [
        {
          path: 'list',
          name: 'sales-order-list',
          component: () => import('@/views/sales/orders/list.vue'),
          meta: {
            title: '销售订单列表',
          },
        },
      ],
    },
  ],
};
