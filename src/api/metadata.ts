import { getMetadata } from '@/api/system.ts';
import { arr2Obj } from '@/utils/common.ts';
import { Metadata } from '%/database/model/metadata.ts';

export const getUnit = (): Promise<Metadata[]> => {
  return getMetadata('unit');
};

let currencyCache: Metadata[];
export const getCurrencyList = async (): Promise<Metadata[]> => {
  if (currencyCache) return currencyCache;
  // const { data } = await getDataFromDatabase(tableName, { category: 'currency' }, 'id ASC');
  return (currencyCache ??= await getMetadata('currency'));
};

export const getCurrency = async (currencyCode: string) => {
  const currency = await getCurrencyList();
  return arr2Obj(currency, 'code')[currencyCode];
};
