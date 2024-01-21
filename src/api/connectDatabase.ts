// 和数据库交互的统一方法，用于各种预处理数据
import {
  DatabaseParams,
  DatabaseParamsForUpdate,
  deleteDataToDatabase,
  getDataFromDatabase,
  insertDataToDatabase,
  updateDataToDatabase,
} from '@/api/db.ts';
import { changeObjectKey } from '@/utils/common.ts';
import dayjs from 'dayjs';

export const connectDatabase = async (
  type: 'get' | 'add' | 'delete' | 'update',
  tableName: string,
  params?: DatabaseParams | DatabaseParamsForUpdate | number | string | boolean,
  condition?: {
    where?: string | string[];
    order?: string | boolean;
  }
) => {
  const curParam = changeObjectKey(params, 'snake');
  const order = condition?.order ?? 'created_time DESC';
  let response: any;
  switch (type) {
    case 'add':
      curParam.createdTime = dayjs().valueOf();
      response = await insertDataToDatabase(tableName, curParam);
      !response.error && $myMessage.success('新增成功！');
      break;
    case 'delete':
      response = await deleteDataToDatabase(tableName, curParam);
      !response.error && $myMessage.success('已被残忍抹去！');
      break;
    case 'update':
      // curParam.updatedTime = dayjs().valueOf();
      response = await updateDataToDatabase(tableName, curParam, condition?.where);
      !response.error && $myMessage.success('小主，更新成功啦！');
      break;
    case 'get':
      const res: any = await getDataFromDatabase(tableName, curParam, order);
      response = await changeObjectKey(res, 'camel');
      break;
  }
  if (response.error) {
    $myMessage.error(response.error);
  }

  return response;
};
