import { connectDatabase } from '@/api/connectDatabase.ts';
import { AnyObject, BasicDataInfo } from '@/utils/types.ts';
import { getSqlite3 } from '@/api/db.ts';
import { generateSerialNumber } from '@/api/generateSerialNumber.ts';
import { getInsertSql } from '@/utils/sql.ts';
import { cloneDeep } from 'lodash';
import { errorResponse, successResponse } from '@/api/commont.ts';

const orderTableName = 'purchase_orders';
const listTableName = 'goods_list_in_order';
export const getPurchaseOrderList = async (): Promise<PurchaseOrderMainInfo[]> => {
  return connectDatabase('get', orderTableName);
};

export const getPurchaseOrderDetail = async (id: number | string) => {
  // const db = await getSqlite3();
  const mainInfo = await connectDatabase('get', orderTableName, { id: id });
  const data = mainInfo.data[0];
  const listInfo = await connectDatabase('get', listTableName, { orderNumber: data.orderNumber }, { order: false });
  console.log(listInfo);
  data.purchaseList = listInfo.data;
  return data;
  // db.all(`SELECT  ${orderTableName}.order_number,${orderTableName}.supplier, ${listTableName}.name,${listTableName}.sku
  //               FROM ${orderTableName} INNER JOIN ${listTableName}
  //               ON ${orderTableName}.order_number = ${listTableName}.order_number
  //               WHERE ${orderTableName}.id = 10`, function(e, row) {
  //   console.log(e, row);
  // });
  // db.all(`SELECT  ${orderTableName}.order_number,${orderTableName}.supplier, ${listTableName}.name,${listTableName}.sku
  //               FROM ${orderTableName} LEFT JOIN ${listTableName}
  //               ON ${orderTableName}.order_number = ${listTableName}.order_number
  //               WHERE ${orderTableName}.id = 10`, function(e, row) {
  //   console.log(e, row);
  // });
};

export const addPurchaseOrder = async (params: any) => {
  const db = await getSqlite3();
  const curParams = cloneDeep(params);
  const purchaseList = curParams.purchaseList;
  delete curParams.purchaseList;

  // 初始化 sql 语句
  const mainSql = getInsertSql(orderTableName, curParams);

  return new Promise((resolve) => {
    // db.serialize(() => {
    // db.run("BEGIN TRANSACTION");
    // 新增采购订单主信息
    db.run(mainSql.sql, mainSql.values[0], async function (err) {
      if (err) {
        resolve({ error: err, ...errorResponse });
        // db.run("ROLLBACK", err => {
        //   if (err) {
        //     console.error(err);
        //   }
        // });
      }
      // 设置订单号
      const serialNumber = <string>await generateSerialNumber('purchaseOrder');

      await connectDatabase('update', orderTableName, { orderNumber: serialNumber, id: this.lastID });

      const listSql = getInsertSql(listTableName, purchaseList, (item) => (item.orderNumber = serialNumber));

      // db.run(listSql.sql, listSql.values[0], (err) => {
      //   if (err) {
      //     resolve({ error: err.message, ...errorResponse });
      //   }
      //   resolve({ ...successResponse });
      // });
      // listSql.values.forEach(item => { db.run(listSql.sql,item,err => {
      //   console.log(err)
      // })})
      // 新增采购清单
      const stmt = db.prepare(listSql.sql);
      // listSql.values.forEach((params) =>
      //   stmt.run(params, (err) => {
      //     if (err) {
      //       resolve(err);
      //       // db.run("ROLLBACK", err => {
      //       //   if (err) {
      //       //     console.error(err);
      //       //     resolve({ error: err, ...errorResponse });
      //       //   }
      //       // });
      //     }
      //     resolve({ ...successResponse });
      //   })
      // );
      // stmt.finalize();
      Promise.all(
        listSql.values.map((params) => {
          return new Promise((resolve, reject) => {
            stmt.run(params, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
        })
      )
        .then(() => {
          // All runs succeeded, resolve with successResponse
          resolve({ ...successResponse });
        })
        .catch((err) => {
          console.error(err);
          // At least one run failed, resolve with the first error encountered
          resolve({ error: err.message, ...errorResponse });
        })
        .finally(() => {
          stmt.finalize();
        });

      // 提交事务
      // db.run("COMMIT");
      // db.close();
    });
  });
};

export const updatePurchaseOrder = async (params: any) => {
  const curParams = cloneDeep(params);
  const purchaseList = curParams.purchaseList;
  delete curParams.purchaseList;
  await connectDatabase('update', orderTableName, curParams);
  return Promise.all(
    purchaseList.map((goods) => {
      return new Promise(async (resolve, reject) => {
        const res = await connectDatabase('update', listTableName, goods);
        if (res.error) {
          reject(res);
        } else {
          resolve();
        }
      });
    })
  );
};

export const deletePurchaseOrder = async (params: { id: number; orderNumber: string }) => {
  return new Promise((resolve, reject) => {
    Promise.all([
      connectDatabase('delete', orderTableName, params.id),
      connectDatabase('delete', listTableName, { orderNumber: params.orderNumber }),
    ])
      .then(() => resolve({ ...successResponse }))
      .catch((err) => reject({ error: err.message, ...successResponse }));
  });
};

export interface PurchaseOrderMainInfo extends BasicDataInfo {
  orderNumber: string;
  supplier: string;
  warehouse: string;
  orderDate: number;
  goodsReadyDate: number;
  contract: string;
  currency: string;
  price: number;
  purchaseIdList: string;
}

export interface PurchaseOrder extends PurchaseOrderMainInfo {
  purchaseList: AnyObject[];
}
