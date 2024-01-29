import dayjs from 'dayjs';
import { numberToFixedLength } from '@/utils/common.ts';
import { SerialNumber } from '%/database/model/serial-number.ts';

export const generateSerialNumber = async (module: 'purchaseOrder' | 'salesOrder', length: number = 4) => {
  function getCurrentDate() {
    return dayjs().format('YYYYMM');
  }

  return new Promise(async (resolve) => {
    const curSN = await SerialNumber.findOne({
      where: {
        module: module,
      },
    });
    if (curSN?.date == getCurrentDate()) {
      // 同一个月
      const counter = curSN.counter + 1;
      await SerialNumber.update(
        { counter: counter },
        {
          where: {
            module: module,
          },
        }
      );
      resolve(`${curSN.prefix}${getCurrentDate()}${numberToFixedLength(counter, length)}`);
    } else {
      // 第一次生成 或 不同月份
      await SerialNumber.update(
        { date: getCurrentDate(), counter: 1 },
        {
          where: {
            module: module,
          },
        }
      );
      resolve(`${curSN?.prefix}${getCurrentDate()}${numberToFixedLength(1, length)}`);
    }
  });
};
