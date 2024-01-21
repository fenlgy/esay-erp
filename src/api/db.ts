import sqlite3, { type Database, verbose } from 'sqlite3';
import { ipcRenderer } from 'electron';
import { getDeleteSql, getInsertSql, getSelectSql, getUpdateSql } from '@/utils/sql.ts';
import { isEmptyObject } from '@/utils/is.ts';
import { errorResponse, successResponse } from '@/api/commont.ts';
import { MyResponse, MyResponseWithData } from '@/utils/types.ts';

const TAG = '[sqlite3]';
let database: Promise<Database>;
let myDb: sqlite3.Database;

export type SqlParams = Record<string, string | number>;
export type SqlOptions = {
  order?: string;
};

export async function getSqlite3(filename?: string) {
  const dbPath: string = await ipcRenderer.invoke('get-database-path');
  return (database ??= new Promise<Database>((resolve, reject) => {
    const db = new (verbose().Database)(dbPath, (error) => {
      if (error) {
        console.log(TAG, 'initialize failed :(');
        console.log(TAG, error);
        reject(error);
      } else {
        console.log(TAG, 'initialize success :)');
        console.log(TAG, filename);
        resolve(db);
        myDb = db;
      }
    });
  }));
}

export async function getDataFromDatabase(
  tableName: string,
  params?: SqlParams,
  order?: string | boolean
): Promise<MyResponseWithData<any>> {
  await getSqlite3();
  let sql = getSelectSql(tableName, params, order);
  return new Promise((resolve, reject) => {
    myDb.serialize(() => {
      myDb.all(sql, (err, row) => {
        try {
          if (err) {
            console.error(err);
            resolve({
              data: '',
              error: err.message,
              ...errorResponse,
            });
          } else {
            resolve({
              data: row,
              ...successResponse,
            });
          }
        } catch (err) {
          reject(err);
        }
      });
    });
  });
}

export type DatabaseValueType = number | string | null | Blob | undefined;
export type DatabaseParams = Record<string, DatabaseValueType>;
export type DatabaseParamsForUpdate = { sql_where_uniq_key: Record<string, any> } & DatabaseParams;

function parseErrorRespond(message: string, params: DatabaseParams): string {
  const keys = message.split('.');
  const key = keys[keys.length - 1];
  if (message.includes('UNIQUE constraint failed')) {
    message = `字段：${key} ，值：${params[key]} 已存在`;
  } else if (message.includes('NOT NULL constraint failed')) {
    message = `字段：${key} 不能为空`;
  }
  return message;
}

// export const transaction = async (sql, params) => {
//   await getSqlite3();
//   return new Promise((resolve, reject) => {
//     myDb.serialize(() => {
//       myDb.run("BEGIN TRANSACTION");
//
//       // 执行插入操作
//       const stmt = myDb.prepare(sql);
//       params.forEach(params => stmt.run(params));
//       stmt.finalize(err => {
//         if (err) {
//           resolve(err);
//         }
//       });
//
//       // 提交事务
//       myDb.run("COMMIT");
//     });
//   });
// };

export async function insertDataToDatabase(tableName: string, params: DatabaseParams): Promise<MyResponse<any>> {
  if (isEmptyObject(params)) return { error: '参数不可为空', ...errorResponse };
  await getSqlite3();

  const { sql, values } = getInsertSql(tableName, params);

  return new Promise((resolve, reject) => {
    myDb.run(sql, values[0], function (err) {
      try {
        if (err) {
          // console.error(err.message);
          resolve({ error: parseErrorRespond(err.message, params), ...errorResponse });
        } else {
          resolve({
            data: this,
            ...successResponse,
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}

export const SQL_WHERE_UNIQ_KEY = 'sql_where_uniq_key';

export async function updateDataToDatabase(
  tableName: string,
  params: DatabaseParams,
  whereKeys: string | string[] = 'id'
): Promise<MyResponse<any>> {
  if (isEmptyObject(params)) return { error: '参数不可为空', ...errorResponse };
  await getSqlite3();
  // 需要更新的字段
  // const conditions: string[] = [];
  // // where 后面的匹配条件
  // let whereCondition: string[] = [];
  // const _params: DatabaseParams = {};
  // for (const key in params) {
  //   if (key === SQL_WHERE_UNIQ_KEY) {
  //     Object.keys(params[key]).forEach((curKey: string) => {
  //       _params[`$${curKey}`] = params[key][curKey];
  //       whereCondition.push(`${curKey} = $${curKey}`);
  //     });
  //     // @ts-ignore
  //     delete params[SQL_WHERE_UNIQ_KEY];
  //   } else {
  //     conditions.push(`${key} = $${key}`);
  //     _params[`$${key}`] = params[key];
  //   }
  // }
  const { sql, values } = getUpdateSql(tableName, params, whereKeys);
  return new Promise((resolve, reject) => {
    // myDb.run(`UPDATE ${tableName} SET ${conditions.join(",")} WHERE ${whereCondition.join(" AND ")}`, _params, (err) => {
    myDb.run(sql, values, (err) => {
      try {
        if (err) {
          resolve({
            ...errorResponse,
            error: parseErrorRespond(err.message, params),
          });
        } else {
          resolve({
            ...successResponse,
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}

export async function deleteDataToDatabase(
  tableName: string,
  params: string | number | Record<string, number | string>
): Promise<MyResponse<any>> {
  await getSqlite3();
  const { sql, values } = getDeleteSql(tableName, params);
  return new Promise((resolve, reject) => {
    myDb.run(sql, values, (err) => {
      try {
        if (err) {
          console.error(err.message);
          resolve({ error: err.message, ...errorResponse });
        } else {
          resolve({ ...successResponse });
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}
