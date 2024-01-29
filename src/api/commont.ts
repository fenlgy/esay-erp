import { ValidationError } from '@sequelize/core';
import { MyResponse } from '@/utils/types.ts';

export const successResponse = {
  ok: true,
  status: 200,
  statusText: 'success',
};

export const errorResponse = {
  ok: false,
  status: 400,
  statusText: 'error',
};

export function generateResponse(type: 'create' | 'update' | 'delete', promise: Promise<any>): Promise<MyResponse<any>> {
  const typeMapping = {
    create: '新增',
    update: '更新',
    delete: '删除',
  };
  return new Promise(async (resolve) => {
    promise
      .then((res: any) => {
        resolve({ ...successResponse, data: res });
        $myMessage.success(`${typeMapping[type]}成功！`);
      })
      .catch((err: any) => {
        resolve({ ...errorResponse, error: err.errors });
        const messages = err.errors.map((item: ValidationError) => {
          return `${item.message}`;
        });
        console.log(err.errors);
        $myMessage.error(`${typeMapping[type]}失败！${messages.join(',')}`);
      });
  });
}
