import { getDataFromDatabase } from "@/api/db.ts";
import { MyResponse } from "@/utils/types.ts";

const tableName = "basic";

export const getUnit = ():Promise<MyResponse<MetadataUnit[]>> => {
  return getDataFromDatabase(tableName, { category: "unit" });
};

export interface MetadataUnit{
  name:string
  ename:string
  code:string
}