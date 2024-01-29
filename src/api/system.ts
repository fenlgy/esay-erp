import { connectDatabase } from '@/api/connectDatabase.ts';
import { AnyObject, KVObject, MyResponseWithData } from '@/utils/types.ts';
import { camelCase } from 'lodash';
import { DatabaseParamsForUpdate, SQL_WHERE_UNIQ_KEY } from '@/api/db.ts';
import { Warehouse } from '%/database/model/warehouse.ts';
import { Metadata } from '%/database/model/metadata.ts';
import { CreationAttributes } from '@sequelize/core';

const tableName = 'system_config';
export const setSystemConfig = (params: AnyObject) => {
  const key = Object.keys(params)[0];
  // @ts-ignore
  return connectDatabase('update', tableName, {
    [SQL_WHERE_UNIQ_KEY]: {
      key: key,
    },
    value: params[key],
  } as DatabaseParamsForUpdate);
};

export const getSystemConfig = async (): Promise<SystemConfig> => {
  const { data } = <MyResponseWithData<KVObject[]>>await connectDatabase('get', tableName, {}, { order: false });
  return data.reduce(
    (pre, cur) => {
      return {
        ...pre,
        [camelCase(cur.key)]: cur.value,
      };
    },
    <SystemConfig>{}
  );
};

export type SystemConfig = {
  fileStoragePath: string;
  primaryColor: string;
};

// 仓库管理 ---------------------------------------------------------
export const getWarehouse = async (): Promise<Warehouse[]> => {
  return Warehouse.findAll();
};

export const addWarehouse = async (params: CreationAttributes<Warehouse>) => {
  return Warehouse.create(params);
};

export const deleteWarehouse = (id: number | string) => {
  return Warehouse.destroy({
    where: {
      id: id,
    },
  });
};

// 元数据 -----------------------------------------------------------
export const getMetadata = (category: string) => {
  return Metadata.findAll({
    where: {
      category: category,
    },
  });
};

export const deleteMetadata = (id: number) => {
  return Metadata.destroy({
    where: {
      id: id,
    },
  });
};
