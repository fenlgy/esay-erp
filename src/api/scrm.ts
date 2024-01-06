import { connectDatabase } from "@/api/connectDatabase.ts";
import { AnyObject, BasicDataInfo } from "@/utils/types.ts";

const tableName = "scrm";
export const getScrmList = (params: AnyObject): Promise<SCInfo[]> => {
  return connectDatabase("get", tableName, params);
};

export type SCType = 0 | 1 | 2 // 0 全部 / 1 客户 / 2 供应商
export type SCNature = 1 | 2 // 1 企业 / 2 个人
export type SCInfo = {
  type: SCType
  nature: SCNature
  name: string
  ename: string
  uniqueId: string
  code: string
} & BasicDataInfo