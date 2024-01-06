// const sqlite3 = require('sqlite3')
// const { Sequelize } = require('sequelize');
// const NODE_ENV = process.env.NODE_ENV
// const path = require('path')
// const { app } = require('electron')
// let DB_PATH = path.join(app.getAppPath(), '/db/test.db');
//
// console.log('连接数据库路径：',app.getAppPath());
// console.log('连接数据库路径：',DB_PATH);
//
// // 判断是否是正式环境
// if (app.isPackaged) {
//   // 正式环境
//   DB_PATH = path.join(path.dirname(app.getPath('exe')), '/db/main.db');
// }
//
// //连接数据库
// function connectDatabase() {
//   return new sqlite3.Database(DB_PATH, (err) => {
//     if (err) {
//       console.error('连接数据库错误：' + err.message);
//     }
//     console.log('连接数据库成功')
//   });
// }
// const db = connectDatabase();
//
// //创建数据库,如果用户本地没有数据库的话就创建否则跳过
// function createDataTable() {
//   //创建用户表
//   db.serialize(function () {
//     db.run('create table if not exists user (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, email text, phone text);');
//   });
//   // db.close();
// }
// exports.connectDatabase = connectDatabase;
// exports.createDataTable = createDataTable;
// exports.db = db;

const sqlite3 = require('sqlite3').verbose()

let db;
// 连接数据库
export default function conDb() {
  const os = require('os');
  const homedir = os.homedir(); // 用于获取当前用户的主目录路径
  const users = homedir.replace(/\\/g,'\\\\'); // 替换绝对和相对路径
  if (!db || !db.open) {
    db = new sqlite3.Database(users+'\\sql.db'); // 保存地址文件
  };
  return db;
}

exports.defaults = db
