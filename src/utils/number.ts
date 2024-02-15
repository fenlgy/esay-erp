import NP from 'number-precision';
import { isArray, isNumber } from '@/utils/is.ts';
import { tryToGetNumberFormString } from '@/utils/common.ts';

export function isAllNumber(arr: (number | string)[]) {
  if (!arr || !isArray(arr)) return false;
  let isAllNumber = true;
  arr.forEach((num) => !isNumber(tryToGetNumberFormString(num)) && (isAllNumber = false));
  return isAllNumber;
}

export function numberComputer(type: 'plus' | 'minus' | 'times' | 'divide', ...args: (number | string)[]) {
  if (!isAllNumber(args)) return 0;
  return NP[type](...args.map((num) => tryToGetNumberFormString(num)));
}

export function numberPlus(...args: (number | string)[]) {
  return numberComputer('plus', ...args);
}

export function numberDivide(...args: (number | string)[]) {
  return numberComputer('divide', ...args);
}

export function numberSubtract(...args: (number | string)[]) {
  return numberComputer('minus', ...args);
}

export function numberMultiply(...args: (number | string)[]) {
  return numberComputer('times', ...args);
}

export function numberRound(number: number | string, ratio: number) {
  return NP.round(tryToGetNumberFormString(number), ratio);
}
