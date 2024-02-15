import { generateSerialNumber } from '@/api/generateSerialNumber.ts';
import { successResponse } from '@/api/commont.ts';
import { GoodsInOrder } from '%/database/model/goods-in-order.ts';
import { SalesOrder } from '%/database/model/sales-order.ts';

export const getSalesOrderList = async (): Promise<SalesOrder[]> => {
  return SalesOrder.findAll();
};

export const getSalesOrderDetail = async (id: number | string) => {
  return SalesOrder.findOne({ where: { id: id }, include: [GoodsInOrder] });
};

export const addSalesOrder = async (params: SalesOrder) => {
  params.orderNumber = await generateSerialNumber('salesOrder');
  return SalesOrder.create(params, { include: [GoodsInOrder] });
};

export const updateSalesOrder = async (params: any) => {
  await SalesOrder.update(params.dataValues, { where: { id: params.id } });
  await GoodsInOrder.destroy({ where: { orderNumber: params?.orderNumber } });
  return GoodsInOrder.bulkCreate(
    params?.goodsInOrder.map((item: GoodsInOrder) => {
      if (item.dataValues) {
        return item.dataValues;
      } else {
        item.orderNumber = params.orderNumber;
        item.currency = params.currency;
        item.targetModel = 'salesOrder';
        return item;
      }
    })
  );
};

export const deleteSalesOrder = async (params: { id: number; orderNumber: string }) => {
  return new Promise((resolve, reject) => {
    Promise.all([SalesOrder.destroy({ where: { id: params.id } }), GoodsInOrder.destroy({ where: { orderNumber: params.orderNumber } })])
      .then(() => resolve({ ...successResponse }))
      .catch((err) => reject({ error: err.message, ...successResponse }));
  });
};
