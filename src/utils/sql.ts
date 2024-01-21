import { isArray, isObject } from '@/utils/is.ts';
import { changeObjectKey, isObjectHaveValue } from '@/utils/common.ts';
import { DatabaseParams, SqlParams } from '@/api/db.ts';
import { AnyObject } from '@/utils/types.ts';
import { cloneDeep } from 'lodash';

/**
 * 获取参数中的键值对
 * @param params - 参数对象或参数对象数组
 * @returns 键值对数组
 */
function getKeyCell(params: Record<string, string | number>) {
  const pairs = [];
  if (isObject(params)) {
    for (const key in params) {
      pairs.push(`${key} = '${params[key]}'`);
    }
  }
  return pairs;
}

/**
 * 从参数中获取 SELECT SQL 语句: {key1:1,key2:2} => key1 = 1 AND key2 = 2 , [{key:1},{key:2}] => key = 1 OR key =2
 * @param params - 参数对象或参数对象数组
 * @returns 生成的 SELECT SQL 语句
 */
export const getSelectSqlFromParams = (params: Record<string, string | number> | Record<string, string | number>[]) => {
  // {key1:1,key2:2} => key1 = 1 AND key2 = 2
  if (isObject(params)) {
    return getKeyCell(params).join(' AND ');
  }
  // [{key:1},{key:2}] => key = 1 OR key =2
  if (isArray(params)) {
    let res = '';
    params.forEach((item, index) => {
      if (index === 0) {
        res += getKeyCell(item).join(' AND ');
      } else {
        res += ' OR ' + getKeyCell(item).join(' OR ');
      }
    });
    return res;
  }
};

/**
 * 根据表名、参数和排序方式生成 SELECT SQL 语句
 * @param table - 表名
 * @param params - 参数对象
 * @param order - 排序方式，默认为 "created_time DESC"
 * @returns 生成的 SELECT SQL 语句
 */
export const getSelectSql = (table: string, params?: SqlParams, order: string | boolean = 'created_time DESC') => {
  let sql: string;
  if (isObjectHaveValue(params)) {
    sql = `SELECT * FROM ${table} WHERE ${getSelectSqlFromParams(<SqlParams>params)}`;
  } else {
    sql = `SELECT * FROM ${table}`;
  }
  if (order) {
    sql += ` ORDER BY ${order}`;
  }
  return sql;
};

/**
 * 根据表名和参数生成 INSERT SQL 语句及对应的值
 * @param table - 表名
 * @param params - 参数对象或参数对象数组
 * @param callBack - 回调函数，用于处理每个参数对象
 * @returns 包含生成的 INSERT SQL 语句和对应的值的对象
 */
export const getInsertSql = (table: string, params: any, callBack?: (item: Record<string, any>) => void) => {
  const curParams = Array.isArray(params) ? params : [params];
  curParams.forEach((item) => {
    callBack && callBack(item);
  });
  const newParams = curParams.map((item) => changeObjectKey(item, 'snake'));
  const keys = Object.keys(newParams[0]);
  const keyName = keys.join(',');
  const valueSymbol = Array(keys.length).fill('?').join(',');
  const values = newParams.map((item) => Object.values(item));
  let sql = `INSERT INTO ${table} (${keyName}) VALUES (${valueSymbol})`;
  return {
    sql,
    values,
  };
};

export const getUpdateSql = (table: string, params: AnyObject, whereKeys: string | string[]) => {
  const curWhereKeys = isArray(whereKeys) ? whereKeys : [whereKeys];
  const curParams = cloneDeep(params);
  // 需要更新的字段
  const conditions: string[] = [];
  // where 后面的匹配条件
  let whereCondition: string[] = [];
  const _params: DatabaseParams = {};
  for (const key in curParams) {
    if (curWhereKeys.includes(key)) {
      _params[`$${key}`] = curParams[key];
      whereCondition.push(`${key} = $${key}`);
      delete curParams[key];
    } else {
      conditions.push(`${key} = $${key}`);
      _params[`$${key}`] = params[key];
    }
  }

  return {
    sql: `UPDATE ${table} SET ${conditions.join(',')} WHERE ${whereCondition.join(' AND ')}`,
    values: _params,
  };
};

export const getDeleteSql = (table: string, params: number | string | Record<string, number | string>) => {
  const curParams = isObject(params) ? params : { id: params };
  let whereCondition: string;
  const values = <(number | string)[]>[];
  whereCondition = Object.keys(curParams)
    .map((key) => {
      values.push(curParams[key]);
      return `${key} = ?`;
    })
    .join(' AND ');
  return {
    sql: `DELETE FROM ${table} WHERE ${whereCondition}`,
    values: values,
  };
};
