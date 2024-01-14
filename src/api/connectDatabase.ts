// 和数据库交互的统一方法，用于各种预处理数据
import {
  DatabaseParams, DatabaseParamsForUpdate,
  deleteDataToDatabase,
  getDataFromDatabase,
  insertDataToDatabase,
  updateDataToDatabase
} from "@/api/db.ts";
import { changeObjectKey } from "@/utils/common.ts";

export const connectDatabase = async (
  type: "get" | "add" | "delete" | "update",
  tableName: string,
  params?: DatabaseParams | DatabaseParamsForUpdate | number | string | boolean,
  condition?: {
    where?: string | string[]
    order?: string | boolean
  }
) => {
  const curParam = changeObjectKey(params, "snake");
  const order = condition?.order ?? 'created_time DESC'
  switch (type) {
    case "add":
      return insertDataToDatabase(tableName, curParam);
    case "delete":
      return deleteDataToDatabase(tableName, curParam);
    case "update":
      return updateDataToDatabase(tableName, curParam, condition?.where);
    case "get":
      const res: any = await getDataFromDatabase(tableName, curParam, order);
      return changeObjectKey(res, "camel");
  }
};
