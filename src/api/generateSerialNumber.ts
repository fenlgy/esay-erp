import { getSqlite3 } from "@/api/db.ts";
import dayjs from "dayjs";
import { numberToFixedLength } from "@/utils/common.ts";

const tableName = "serial_numbers";
export const generateSerialNumber = async (module: 'purchaseOrder'|'salesOrder', length: number = 4) => {
  const db = await getSqlite3();

  function getCurrentDate() {
    return dayjs().format("YYYYMM");
  }

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION");
      db.get(`SELECT * FROM ${tableName} WHERE module = ? `, [module], (err, row: SerialNumbersTable) => {
        if (err) {
          db.run("ROLLBACK"); // 回滚事务
          reject(err);
          return;
        }

        if (row.date !== getCurrentDate()) {
          // 如果当天没有记录，插入新的记录
          db.run(`UPDATE ${tableName} SET counter = $counter,date=$date WHERE id = $id`, {
            $id: row.id,
            $counter: 1,
            $date: getCurrentDate()
          }, (err) => {
            if (err) {
              db.run("ROLLBACK"); // 回滚事务
              reject(err);
            } else {
              // 提交事务
              db.run("COMMIT", () => {
                resolve(`${row.prefix}${getCurrentDate()}${numberToFixedLength(1,length)}`);
              });
            }
          });
        } else {
          // 如果有记录，更新流水号
          const newSerialNumber = row.counter + 1;
          const prefix = row.prefix;
          db.run(`UPDATE ${tableName} SET counter = $counter,date=$date WHERE id = $id`, {
            $id: row.id,
            $counter: newSerialNumber,
            $date: getCurrentDate()
          }, (err) => {
            if (err) {
              db.run("ROLLBACK"); // 回滚事务
              reject(err);
            } else {
              // 提交事务
              db.run("COMMIT", () => {
                resolve(`${prefix}${getCurrentDate()}${numberToFixedLength(newSerialNumber,length)}`);
              });
            }
          });
        }
      });
    });
  });
};

export type SerialNumbersTable = {
  id: number
  counter: number
  date: string
  prefix: string
}