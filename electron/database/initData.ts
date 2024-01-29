import { Metadata } from './model/metadata';
import { SerialNumber } from './model/serial-number';

export const initData = async () => {
  await Metadata.bulkCreate([
    {
      category: 'unit',
      name: '件',
      enName: 'Piece',
      code: 'PCS',
    },
    {
      category: 'unit',
      name: '箱',
      enName: 'carton',
      code: 'CTN',
    },
    {
      category: 'currency',
      name: '人民币',
      enName: 'CNY',
      code: 'CNY',
      symbol: '¥',
    },
    {
      category: 'currency',
      name: '美元',
      enName: 'USD',
      code: 'USD',
      symbol: '$',
    },
  ]);
  await SerialNumber.bulkCreate([
    { module: 'purchaseOrder', prefix: 'PO' },
    { module: 'salesOrder', prefix: 'SO' },
  ]);
};
