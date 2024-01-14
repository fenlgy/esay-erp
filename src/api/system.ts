import { connectDatabase } from "@/api/connectDatabase.ts";
import { AnyObject, BasicDataInfo, KVObject, MyResponseWithData } from "@/utils/types.ts";
import { camelCase } from "lodash";
import { DatabaseParamsForUpdate, SQL_WHERE_UNIQ_KEY } from "@/api/db.ts";

const tableName = "system_config";
export const setSystemConfig = (params: AnyObject) => {
  const key = Object.keys(params)[0];
  // @ts-ignore
  return connectDatabase("update", tableName, {
    [SQL_WHERE_UNIQ_KEY]: {
      key: key
    },
    value: params[key]
  } as DatabaseParamsForUpdate);
};

export const getSystemConfig = async (): Promise<SystemConfig> => {
  const { data } = <MyResponseWithData<KVObject[]>>await connectDatabase("get", tableName,{},{order:false});
  return data.reduce((pre, cur) => {
    return {
      ...pre,
      [camelCase(cur.key)]: cur.value
    };
  }, <SystemConfig>{});
};

export type SystemConfig = {
  fileStoragePath: string
  primaryColor: string
}

// 仓库管理 ---------------------------------------------------------
export const getWarehouse = async (): Promise<MyResponseWithData<WareHouseInfo[]>> => {
  return connectDatabase("get", "warehouse");
};

export const addWarehouse = (params:WareHouseInfo) => {
  return connectDatabase("add", "warehouse", params);
};

export const deleteWarehouse = (id:number|string) => {
  return connectDatabase('delete','warehouse',id)
};

export type WareHouseInfo = {
  name: string
  ename: string
} & BasicDataInfo

// 单位管理 ---------------------------------------------------------
export const getUnitList = async (): Promise<UnitInfo[]> => {
  return connectDatabase("get", "basic",{category:'unit'});
};

export const addUnit = (params:UnitInfo) => {
  return connectDatabase("add", "unit", params);
};

export const deleteUnit = (id:number|string) => {
  return connectDatabase('delete','unit',id)
};

export type UnitInfo = {
  name: string
  ename: string
} & BasicDataInfo