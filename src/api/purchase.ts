import { generateSerialNumber } from '@/api/generateSerialNumber.ts';
import { successResponse } from '@/api/commont.ts';
import { PurchaseOrder } from '%/database/model/purchase-order.ts';
import { GoodsInOrder } from '%/database/model/goods-in-order.ts';

export const getPurchaseOrderList = async (): Promise<PurchaseOrder[]> => {
  return PurchaseOrder.findAll();
};

export const getPurchaseOrderDetail = async (id: number | string) => {
  return PurchaseOrder.findOne({ where: { id: id }, include: [GoodsInOrder] });
};

export const addPurchaseOrder = async (params: PurchaseOrder) => {
  params.orderNumber = await generateSerialNumber('purchaseOrder');
  return PurchaseOrder.create(params, { include: [GoodsInOrder] });
};

export const updatePurchaseOrder = async (params: any) => {
  // const sequelize = await initSqlite3();
  // try {
  //   return await sequelize.transaction(async () => {
  // const curOrder = await PurchaseOrder.findByPk(params.id);
  // console.log(params);
  // console.table(params?.goodsInOrder);
  await PurchaseOrder.update(params.dataValues, { where: { id: params.id } });
  await GoodsInOrder.destroy({ where: { orderNumber: params?.orderNumber } });
  // params.goodsInOrder.forEach((goods) => {
  //   if (goods.id) {
  //     GoodsInOrder.update(goods.dataValues, { where: { id: goods.id } });
  //   } else {
  //     goods.orderNumber = params.orderNumber;
  //     goods.currency = params.currency;
  //     GoodsInOrder.create(goods);
  //   }
  // });
  // return { ...successResponse };
  // console.log(
  //   params?.goodsInOrder.map((item: GoodsInOrder) => {
  //     if (item.dataValues) {
  //       return item.dataValues;
  //     } else {
  //       item.orderNumber = params.orderNumber;
  //       return item;
  //     }
  //   })
  // );
  return GoodsInOrder.bulkCreate(
    params?.goodsInOrder.map((item: GoodsInOrder) => {
      if (item.dataValues) {
        return item.dataValues;
      } else {
        item.orderNumber = params.orderNumber;
        item.currency = params.currency;
        item.targetModel = 'purchaseOrder';
        return item;
      }
    })
  );
};

export const deletePurchaseOrder = async (params: { id: number; orderNumber: string }) => {
  return new Promise((resolve, reject) => {
    Promise.all([PurchaseOrder.destroy({ where: { id: params.id } }), GoodsInOrder.destroy({ where: { orderNumber: params.orderNumber } })])
      .then(() => resolve({ ...successResponse }))
      .catch((err) => reject({ error: err.message, ...successResponse }));
  });
};
