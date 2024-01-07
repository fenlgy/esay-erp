import { getDataFromDatabase } from "@/api/db.ts";
import { MyResponse } from "@/utils/types.ts";

const tableName = "basic";
export interface Metadata{
  name:string
  ename:string
  code:string
}

export const getUnit = ():Promise<MyResponse<Metadata[]>> => {
  return getDataFromDatabase(tableName, { category: "unit" });
};

export const getCurrency = ():Promise<MyResponse<Metadata[]>> => {
  return getDataFromDatabase(tableName, { category: "currency" });
};

