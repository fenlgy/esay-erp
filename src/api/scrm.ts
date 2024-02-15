import { Cs } from '%/database/model/cs.ts';
import { AnyObject } from '@/utils/types.ts';
import { Op } from '@sequelize/core';

export const getScrmList = (options: AnyObject): Promise<Cs[]> => {
  if (options) {
    return Cs.findAll(options);
  }
  return Cs.findAll();
};

export const getCsDetail = (id: number | string) => {
  debugger;

  return Cs.findOne({
    where: {
      id: id,
    },
  });
};

export const addScrm = (params: Cs) => {
  return Cs.create(params);
};
