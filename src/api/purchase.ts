import { connectDatabase } from "@/api/connectDatabase.ts";
import { BasicDataInfo } from "@/utils/types.ts";

const tableName = "purchase_orders";
export const getPurchaseOrderList = async () => {
  return  connectDatabase("get", tableName);
};

export const addPurchaseOrder = async (params)=>{
  return  connectDatabase("add", tableName,params);
}


export interface PurchaseOrder extends BasicDataInfo {
  orderNumber: string;
  supplier: string;
  warehouse: string;
  orderDate: number;
  goodsReadyDate: number;
  contract: string;
  purchaseList: string;
}