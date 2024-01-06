import {
  DatabaseParams,
  DatabaseParamsForUpdate, deleteDataToDatabase,
  getDataFromDatabase, insertDataToDatabase, SQL_WHERE_UNIQ_KEY,
  SqlParams,
  updateDataToDatabase
} from "@/api/db.ts";
import { connectDatabase } from "@/api/connectDatabase.ts";
import { AnyObject, BasicDataInfo, MyResponseWithData } from "@/utils/types.ts";
import { isArray } from "@/utils/is.ts";
import { cloneDeep } from "lodash";

const tableName = "products";
export const getProducts = (params?: SqlParams) => {
  return connectDatabase("get", tableName, params);
};

export const getProductsDetail = async (id: number): Promise<MyResponseWithData<GoodsDetail>> => {
  return getDataFromDatabase(tableName, { id: id });
};

const getUpdateDatabaseParams = (params: AnyObject, whereKeys: string | string[]): DatabaseParamsForUpdate => {
  const curWhereKeys = isArray(whereKeys) ? whereKeys : [whereKeys];
  const curParams = cloneDeep(params);
  const whereCondition = curWhereKeys.reduce((pre, curKey) => {
    // @ts-ignore
    pre[curKey] = curParams[curKey];
    delete curParams[curKey];
    return pre;
  }, {});
// @ts-ignore
  return {
    [SQL_WHERE_UNIQ_KEY]: whereCondition,
    ...curParams
  };
};

export const updateProducts = async (params: AnyObject) => {
  const whereKeys = ["id"];
  let respondMessage: string = "";
  const isHaveValueWithWhereKeys = whereKeys.every(key => {
    const res = params.hasOwnProperty(key) && params[key] !== null && params[key] !== undefined && params[key] !== "";
    if (!res) {
      respondMessage += `商品更新接口：whereKey:${key} 没有值，`;
    }
    return res;
  });
  if (!isHaveValueWithWhereKeys) {
    console.error(respondMessage);
    return false;
  }
  return await updateDataToDatabase(tableName, getUpdateDatabaseParams(params, whereKeys));
};


export const addProduct = (params: DatabaseParams) => {
  return insertDataToDatabase(tableName, params);
};

export const deleteProduct = (id: number | string) => {
  return deleteDataToDatabase(tableName, id);
};

export interface GoodsDetail extends BasicDataInfo {
  name: string;
  ename?: string;
  unit: string;
  sku: string;
  systemCode: string;
}