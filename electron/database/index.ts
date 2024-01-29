import { Sequelize } from '@sequelize/core';
import { ipcRenderer } from 'electron';
import { each } from 'lodash';

const isClass = (value: any) => typeof value === 'function' && value.prototype instanceof Object;

// 递归遍历对象获取 class 类
function traverseObject(obj, callback) {
  each(obj, (value, key) => {
    if (isClass(value)) {
      callback(value);
    } else {
      traverseObject(value, callback);
    }
  });
}

function getModels() {
  const models = [];
  const modelsObj = import.meta.glob('./model/**/*.ts', { eager: true });
  traverseObject(modelsObj, function (key) {
    models.push(key);
  });
  return models;
}

let sequelize;
export async function initSqlite3() {
  if (sequelize) return sequelize;
  // console.log(process.cwd() + '/electron/database/model/**/*.ts');
  const dbPath: string = await ipcRenderer.invoke('get-database-path');
  const sq = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    // schema: 'public',
    models: getModels(),
    // models: await importModels(process.cwd()+'/electron/database/model/**/*.ts'),
    // logging: console.log, // 默认值,显示日志函数调用的第一个参数
    // logging: (...msg) => console.log(msg), // 显示所有日志函数调用参数
    // logging: false,                        // 禁用日志记录
    // logging: msg => logger.debug(msg),     // 使用自定义记录器(例如Winston 或 Bunyan),显示第一个参数
    // logging: logger.debug.bind(logger)     // 使用自定义记录器的另一种方法,显示所有消息
  });

  try {
    await sq.authenticate();
    // 设置默认的参数
    sq.hooks.addListener('beforeFind', (v) => {
      v.limit = 10;
      // v.order = [['createdAt', 'DESC']];
    });
    console.log('Connection has been established successfully.');
    // await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  return sq;
}
