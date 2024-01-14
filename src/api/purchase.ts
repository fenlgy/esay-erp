import { connectDatabase } from "@/api/connectDatabase.ts";
import { AnyObject, BasicDataInfo } from "@/utils/types.ts";
import { getSqlite3 } from "@/api/db.ts";
import { generateSerialNumber } from "@/api/generateSerialNumber.ts";
import { getInsertSql } from "@/utils/sql.ts";
import { cloneDeep } from "lodash";
import { errorResponse, successResponse } from "@/api/commont.ts";

const orderTableName = "purchase_orders";
const listTableName = "goods_list_in_order";
export const getPurchaseOrderList = async (): Promise<PurchaseOrderMainInfo[]> => {
  return connectDatabase("get", orderTableName);
};

export const getPurchaseOrderDetail = async (id: number | string) => {
  // const db = await getSqlite3();
  const mainInfo = await connectDatabase("get", orderTableName,{id:id});
  const listInfo = await connectDatabase('get',listTableName,{orderNumber:mainInfo.data[0].orderNumber},{order:false})
  mainInfo.data[0].purchaseList = listInfo.data
  return mainInfo.data[0]
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

  console.log(params)
  // 初始化 sql 语句
  const mainSql = getInsertSql(orderTableName, curParams);

  return new Promise((resolve) => {
    // db.serialize(() => {
    // db.run("BEGIN TRANSACTION");
    // 新增采购订单主信息
    db.run(mainSql.sql, mainSql.values[0], async function(err) {
      if (err) {
        resolve({ error: err, ...errorResponse });
        // db.run("ROLLBACK", err => {
        //   if (err) {
        //     console.error(err);
        //   }
        // });
      }
      // 设置订单号
      const serialNumber = <string>await generateSerialNumber("purchaseOrder");

      await connectDatabase('update', orderTableName, { orderNumber: serialNumber, id: this.lastID })
      const listSql = getInsertSql(listTableName, purchaseList, (item) => item.orderNumber = serialNumber);

      // listSql.values.forEach(item => { db.run(listSql.sql,item,err => {
      //   console.log(err)
      // })})
      // 新增采购清单
      const stmt = db.prepare(listSql.sql);
      listSql.values.forEach(params => stmt.run(params));
      stmt.finalize(err => {
        if (err) {
          resolve(err);
          // db.run("ROLLBACK", err => {
          //   if (err) {
          //     console.error(err);
          //     resolve({ error: err, ...errorResponse });
          //   }
          // });
        }
        resolve({ ...successResponse });
      });

      // 提交事务
      // db.run("COMMIT");
      // db.close();

    });
  });

};

export interface PurchaseOrderMainInfo extends BasicDataInfo {
  orderNumber: string;
  supplier: string;
  warehouse: string;
  orderDate: number;
  goodsReadyDate: number;
  contract: string;
  purchaseIdList: string;
}

export interface PurchaseOrder extends PurchaseOrderMainInfo {
  purchaseList: AnyObject[];
}