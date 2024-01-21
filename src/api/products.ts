import {
  DatabaseParams,
  deleteDataToDatabase,
  getDataFromDatabase,
  insertDataToDatabase,
  SqlParams,
  updateDataToDatabase,
} from '@/api/db.ts';
import { connectDatabase } from '@/api/connectDatabase.ts';
import { AnyObject, BasicDataInfo, MyResponseWithData } from '@/utils/types.ts';

const tableName = 'products';
export const getProducts = (params?: SqlParams) => {
  return connectDatabase('get', tableName, params);
};

export const getProductsDetail = async (id: number): Promise<MyResponseWithData<GoodsDetail>> => {
  return connectDatabase('get', tableName, { id: id });
};

export const updateProducts = async (params: AnyObject) => {
  // const whereKeys = ["id"];
  // let respondMessage: string = "";
  // const isHaveValueWithWhereKeys = whereKeys.every(key => {
  //   const res = params.hasOwnProperty(key) && params[key] !== null && params[key] !== undefined && params[key] !== "";
  //   if (!res) {
  //     respondMessage += `商品更新接口：whereKey:${key} 没有值，`;
  //   }
  //   return res;
  // });
  // if (!isHaveValueWithWhereKeys) {
  //   console.error(respondMessage);
  //   return false;
  // }
  return await updateDataToDatabase(tableName, params, 'id');
};

export const addProduct = (params: DatabaseParams) => {
  return connectDatabase('add', tableName, params);
};

export const deleteProduct = (id: number | string) => {
  return connectDatabase('delete', tableName, id);
};

export interface GoodsDetail extends BasicDataInfo {
  name: string;
  ename?: string;
  unit: string;
  sku: string;
  systemCode: string;
}
