import { Cs } from '%/database/model/cs.ts';
import { AnyObject } from '@/utils/types.ts';

export const getScrmList = (params: AnyObject[]): Promise<Cs[]> => {
  if (params) {
    return Cs.findAll({
      where: {
        $or: params,
      },
    });
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
