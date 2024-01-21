import { getDataFromDatabase } from '@/api/db.ts';
import { MyResponse } from '@/utils/types.ts';
import { CurrencyInfo } from '@/api/system.ts';
import { arr2Obj } from '@/utils/common.ts';

const tableName = 'basic';
export interface Metadata {
  name: string;
  ename: string;
  code: string;
}

export const getUnit = (): Promise<MyResponse<Metadata[]>> => {
  return getDataFromDatabase(tableName, { category: 'unit' });
};

let currencyCache: CurrencyInfo[];
export const getCurrencyList = async (): Promise<CurrencyInfo[]> => {
  if (currencyCache) return currencyCache;
  const { data } = await getDataFromDatabase(tableName, { category: 'currency' }, 'id ASC');
  currencyCache = data;
  return currencyCache;
};

export const getCurrency = async (currencyCode: string) => {
  const currency = await getCurrencyList();
  return arr2Obj(currency, 'code')[currencyCode];
};
