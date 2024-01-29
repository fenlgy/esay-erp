export default {
  path: '/product',
  children: [
    {
      path: 'detail/:id*',
      name: 'goods-detail',
      component: () => import('@/views/produc/edit.vue'),
      meta: {
        title: '商品管理详情',
      },
    },
    {
      path: 'list',
      name: 'goods-list',
      component: () => import('@/views/produc/list.vue'),
      meta: {
        title: '商品管理列表',
      },
    },
  ],
};
