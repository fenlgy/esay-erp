// 和数据库交互的统一方法，用于各种预处理数据
import {
  DatabaseParams, DatabaseParamsForUpdate,
  deleteDataToDatabase,
  getDataFromDatabase,
  insertDataToDatabase, SQL_WHERE_UNIQ_KEY,
  updateDataToDatabase
} from "@/api/db.ts";
import { changeObjectKey } from "@/utils/common.ts";
import { AnyObject } from "@/utils/types.ts";
import { isArray } from "@/utils/is.ts";
import { cloneDeep } from "lodash";

export const connectDatabase = async (
  type: "get" | "add" | "delete" | "update",
  tableName: string,
  params?: DatabaseParams | DatabaseParamsForUpdate | number | string | boolean,
  order?: string | boolean,
  ) => {
  const curParam = changeObjectKey(params, "snake");
  switch (type) {
    case "add":
      return insertDataToDatabase(tableName, curParam);
    case "delete":
      return deleteDataToDatabase(tableName, curParam);
    case "update":
      return updateDataToDatabase(tableName, <DatabaseParamsForUpdate>curParam);
    case "get":
      const res: any = await getDataFromDatabase(tableName, curParam);
      return changeObjectKey(res, "camel");
  }
};

const getWhereParams = (params: AnyObject, whereKeys: string | string[]) => {
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