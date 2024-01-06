import { connectDatabase } from "@/api/connectDatabase.ts";
import { MyBoolean } from "@/utils/types.ts";

const tableName = "scrm";
export const getScrmList = (type: 1 | 2):Promise<SCInfo[]> => {
  return connectDatabase("get", tableName, { type });
};

export type SCType = 0 | 1 | 2 // 0 全部 / 1 客户 / 2 供应商
export type SCInfo = {
  id: number
  type: SCType
  isPersonal: MyBoolean
  name: string
  ename: string
  uniqueId: string
  code: string
  createdTime: string
  updatedTime: string
  disabled: MyBoolean
}