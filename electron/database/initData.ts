import { Metadata } from './model/metadata';
import { SerialNumber } from './model/serial-number';
import { Product } from './model/product';
import { Cs } from './model/cs';

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
      category: 'unit',
      name: '个',
      enName: 'unit',
      code: 'UNIT',
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
  await Product.bulkCreate([{ name: '榴莲王', sku: 'LIULIANGWANG', unit: '个' }]);
  await Cs.bulkCreate([{ name: '卡卡西', type: 0, nature: 1 }]);
};
