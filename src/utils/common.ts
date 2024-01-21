// 浏览器相关
import { isEmptyObject, isFunction, isObject, isString } from '@/utils/is.ts';
import { camelCase, snakeCase } from 'lodash';
import { AnyObject } from '@/utils/types.ts';
import dayjs from 'dayjs';

export const timeFormat = (date: string | number) => {
  if (!date) return date;
  return dayjs(date).format('YYYY-MM-DD hh:mm');
};

/**
 * @author FEN
 * @description 从浏览器中获取请求参数，返回 key value 形式的对象
 */
export const getSearchParams = () => {
  const res: { [K: string]: string } = {};
  const params = new URLSearchParams(window.location.search);
  params.forEach((v, k) => (res[k] = v));
  return res;
};

/**
 * 将对象转换为键值对字符串
 * @param obj
 * @param link - 键值对之间的连接符
 * @param split - 键值对之间的分隔符，默认为空格
 * @returns 转换后的键值对字符串
 */
export const getKVStringFromObj = (obj: Record<string, string | number>, link: string, split: string = ' '): string => {
  const pairs = [];
  for (const key in obj) {
    pairs.push(`${key}${link}${obj[key]}`);
  }
  return pairs.join(split);
};

/**
 * 尝试将字符串或数字转换为数字类型
 * @param value - 要转换的值，可以是字符串或数字
 * @returns 转换后的数字，如果无法转换则返回原值
 */
export const tryToGetNumberFormString = (value: string | number) => {
  if (!isNaN(Number(value))) {
    return Number(value);
  } else {
    return value;
  }
};

/**
 * @author FEN
 * @description 格式化数组变成 select 组件需要的 options 格式
 * @param arr 需要转换的数组
 * @param valueKeys value 取哪个字段的值，如果是数组类型则取多个字段的值组合,默认以 '.' 为分隔，支持函数形式
 * @param labelKeys label 取哪个字段的值，如果是数组类型则取多个字段的值组合，支持函数形式
 * @param disabled
 * @param options
 * @param options.split 如果是多个字段组成的 label 之间的分割符号，默认 ' - '
 * @param options.ignore 需要过滤掉的字段支持 function 和 object
 * @return Array {label:string,value:any,...}[]
 * */
export function getSelectOptions(
  arr: {
    [k: string]: any;
  }[],
  valueKeys: string | string[] | Function,
  labelKeys: string | string[] | Function,
  disabled?: {} | Function,
  options?: {
    split?: string;
    ignore?: {} | Function;
  }
) {
  const res: any[] = [];
  arr &&
    arr.map((item) => {
      if (options?.ignore && matchType(item, options.ignore)) return;

      res.push({
        label: joinWithKeys(item, labelKeys, options?.split),
        value: joinWithKeys(item, valueKeys, '.'),
        disabled: disabled ? matchType(item, disabled) : false,
        ...item,
      });
    });
  return res;
}

/**
 * @author FEN
 * @description 把对象中的某几个字段的值组合在一起
 * @return string 组合后的字符串
 * @param obj
 * @param keys
 * @param split 字段之间分隔的字符默认为 ' - '
 * */
export function joinWithKeys(
  obj: {
    [k: string]: string | number;
  },
  keys: string | string[] | Function,
  split: string = ' - '
) {
  if (Array.isArray(keys)) {
    let res: (string | number)[] = [];
    keys.forEach((item) => {
      res.push(obj[item]);
    });
    return res.join(split);
  } else if (isFunction(keys)) {
    return keys(obj);
  } else {
    return obj[keys as string];
  }
}

export type MatchTypeMatcher = ((item: any) => void) | { [key: string]: any };

/**
 * @author FEN
 * @description matcher 中的每个值和对象中的字段比较，返回 true => 完全匹配， part => 部分匹配， false => 完全不匹配
 * @param target  对象
 * @param matcher 对象或则是回调函数，函数第一个参数为对象本身，返回 true 则代表匹配，false 则不匹配
 * @param exactMatch 是否完全匹配，默认为 false
 * @return true => 完全匹配， part => 部分匹配， false => 完全不匹配
 * */
export const matchType = (
  target: {
    [K: string]: any;
  },
  matcher: MatchTypeMatcher,
  exactMatch = true
): boolean | 'part' => {
  // 是否有匹配上的
  let isHaveMatched = false;
  // 是否有未匹配上的
  let isHaveNotMatched = false;
  if (isFunction(matcher)) {
    matcher(target) && (isHaveMatched = true);
  }
  if (isObject(matcher)) {
    Object.keys(matcher).forEach((key) => {
      if (target[key] === matcher[key]) {
        isHaveMatched = true;
      } else {
        isHaveNotMatched = true;
      }
    });
  }
  // 全部匹配
  if (isHaveMatched && !isHaveNotMatched) return true;
  // 部分匹配
  if (isHaveMatched) return exactMatch ? false : 'part';
  // 全部不匹配
  return false;
};

export function changeObjectKey(obj: AnyObject | AnyObject[] | any, type: 'snake' | 'camel'): any {
  if (typeof obj !== 'object' || !obj) {
    return obj;
  }

  const formatter = type === 'snake' ? snakeCase : camelCase;
  if (Array.isArray(obj)) {
    return obj.map((item) => changeObjectKey(item, type));
  }

  return Object.keys(obj).reduce((result: AnyObject, key: string) => {
    const snakeKey = formatter(key);
    result[snakeKey] = changeObjectKey(obj[key], type);
    return result;
  }, {} as AnyObject);
}

/**
 * @author FEN
 * @description 把对象数组按照某个 key 的值返回对象，用于快捷的匹配其他值
 * @param arr{array} 需要转换的数组
 * @param keys{string} 取哪个字段的值作为 key
 * @param opts
 * @param opts.type{"array"|"uniq"} array 保持原来的数组，uniq 做唯一合并
 * @param opts.sumKeys{array} 需要求和的字段，数组类型，只有 type 为 uniq 的时候有效
 * @return object
 * */
export function arr2Obj(
  arr: { [K: string]: any }[],
  keys: string | string[],
  opts?: {
    type: 'array' | 'uniq';
    sumKeys?: string[];
  }
) {
  let obj: { [K: string]: any } = {};
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      const thisKey = Array.isArray(keys) ? getObjValueWithKeys(item, keys) : item[keys];
      const isExists = !!obj[thisKey];
      // array 重复的变为数组形式
      if (opts?.type === 'array') {
        if (isExists) {
          obj[thisKey].push(item);
        } else {
          obj[thisKey] = [item];
        }
      } else if (opts?.type === 'uniq') {
        if (isExists && Array.isArray(opts.sumKeys)) {
          opts.sumKeys.forEach((keyName) => {
            obj[thisKey][keyName] = numberComputer(item[keyName], '+', obj[thisKey][keyName]);
          });
        } else {
          obj[thisKey] = item;
        }
      } else {
        // 最普通传 key 的情况
        obj[thisKey] = item;
      }
    });
  } else {
    console.error(`arr2Obj 中 Arr 参数不是数组请检查`);
  }
  return obj;
}

/**
 * @author FEN
 * @description 把对象中的某几个字段的值组合起来:{a:'aa',b:'bb'} => aa.bb
 * @param source 来源对象
 * @param keys 需要取值的字段
 * @param split 几个值之间的连接字符默认为'.'
 * @return string
 * */
export function getObjValueWithKeys(source: { [K: string]: any }, keys: string[], split: string = '.') {
  if (isString(keys)) {
    return source[keys];
  }

  let res: string[] = [];
  if (Array.isArray(keys)) {
    keys.forEach((key) => res.push(source[key]));
  }
  return res.join(split);
}

/**
 * @author FEN
 * @description 把对象中的某几个字段的值组合起来
 * @param arr 来源对象
 * @param keys 需要取值的字段
 * @param sumKey 合时需要累加的字段
 * @return array
 * */
export function uniqArr(arr: any[], keys: string | string[], sumKey?: string[]) {
  const res: any[] = [];
  const newObj = arr2Obj(arr, keys, { type: 'uniq', sumKeys: sumKey });
  Object.keys(newObj).forEach((keyName) => {
    res.push(newObj[keyName]);
  });
  return res;
}

/**
 * @author FEN
 * @description 把数组中的某些字段设为空
 * @param arr
 * @param keys 为数组，需要设为空的字段名
 * */
export function emptyArrSomeKeys(arr: any[], keys: string[]) {
  arr.forEach((item) => emptyObjSomeKeys(item, keys));
}

/**
 * @author FEN
 * @description 把对象中的某些字段设为空
 * @param obj
 * @param keys 为数组，需要设为空的字段名
 * */
export function emptyObjSomeKeys(obj: { [K: string]: any }, keys: string[]) {
  keys.forEach((key) => {
    switch (typeof obj[key]) {
      case 'string':
        obj[key] = '';
        break;
      case 'number':
        obj[key] = 0;
        break;
      default:
        obj[key] = null;
    }
  });
}

/**
 * @author FEN
 * @description 避免加减乘带来的浮点问题，不包括除法
 * @param x
 * @param symbol 运算符号
 * @param y
 * */
export const numberComputer = (
  x: number | undefined | null | typeof NaN,
  symbol: '+' | '-' | '*' | '/',
  y: number | undefined | typeof NaN
) => {
  const times = 1000000;
  const checkType = [undefined, null, NaN];
  checkType.includes(x) && (x = 0);
  checkType.includes(y) && (y = 0);
  const X = (x as number) * times;
  const Y = (y as number) * times;
  let res: number;
  switch (symbol) {
    case '+':
      res = (X + Y) / times;
      break;
    case '-':
      res = (X - Y) / times;
      break;
    case '*':
      res = (X * Y) / times / times;
      break;
    case '/':
      res = X / Y;
      break;
  }
  return res;
};

/**
 * @author FEN
 * @description 判断对象中的 key 是否都有值，注意：默认空字符串算有值
 */
export const isObjectHaveValue = (obj: { [x: string]: any } | any, emptyStrIsFalse: boolean = false) => {
  // if (obj === "" && emptyStrIsFalse) return false;
  if (isEmptyObject(obj) || !obj) return false;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const curValue = obj[key];
      if (curValue === null || curValue === undefined) {
        return false;
      } else if (Array.isArray(curValue) && curValue.length === 0) {
        return false;
      } else if (isObject(curValue) && Object.keys(curValue).length === 0) {
        return false;
      }
      if (curValue === '' && emptyStrIsFalse) {
        return false;
      }
    }
  }
  return true;
};

export const numberToFixedLength = (num: number, length: number = 4) => {
  return num.toString().padStart(length, '0');
};

/**
 * @author FEN
 * @description 从数组中获取指定字段及值的第一个元素的索引
 * @param arr
 * @param matcher
 * */
export const getFirstIndexFromArr = (arr: { [K: string]: any }[], matcher: MatchTypeMatcher) => {
  let firstIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    let isMatch = false;
    isMatch = matchType(arr[i], matcher) as boolean;

    if (isMatch) {
      firstIndex = i;
      break;
    }
  }
  return firstIndex;
};

/**
 * @author FEN
 * @description 多个 form 表单的验证
 * @param forms c-form 或则 a-form 的 ref 实例
 * @return 每个表单验证不通过的
 * */
export const multiFormValidate = async (forms: any[]) => {
  const res = await Promise.all(forms.map((form) => form.validate()));
  return res.filter((item) => item !== undefined);
};

/**
 * @author FEN
 * @description 去掉数组里的某几个元素以及格式化数组内容后返回新的数组
 * @return 新的数组
 * @param arr
 * @param ignore 过滤条件，函数或对象两种格式
 * @param formatter 格式化内容函数，第一个参数为当前的数组元素
 * */
export const arrReduce = (arr: any[], ignore: MatchTypeMatcher, formatter?: (item: any) => any) => {
  return arr.reduce((acc, item) => {
    if (!matchType(item, ignore)) {
      if (formatter) {
        acc.push(formatter(item));
      } else {
        acc.push(item);
      }
    }
    return acc;
  }, []);
};

/**
 * @author FEN
 * @description 从目标数组中删除第一个匹配的元素
 * @param target 目标数组
 * @param matcher 匹配器函数，用于确定要删除的元素
 */
export const arrRemove = (target: object[], matcher: MatchTypeMatcher) => {
  // 获取第一个匹配元素的索引
  const index = getFirstIndexFromArr(target, matcher);

  // 如果找到匹配元素，则从目标数组中删除该元素
  if (index >= 0) {
    target.splice(index, 1);
  }
};

/**
 * @author FEN
 * @description 更新数组
 * @param target 目标数组
 * @param type 更新类型：'add' - 添加元素，'remove' - 删除元素，'upgrade' - 更新元素
 * @param matcher 匹配器，用于确定要删除或更新的元素,当 type 为 add 时，该参数为需要新增的值
 * @param value 新元素的值（仅在 type 'upgrade' 时使用）
 * @returns 更新成功返回 true，否则返回 false
 */
export const updateArray = (target: any[], type: 'add' | 'remove' | 'upgrade', matcher: MatchTypeMatcher | any, value?: any) => {
  // 检查目标是否为数组类型
  if (!Array.isArray(target)) {
    console.error(`updateArray 中的 target 不是 array 类型！`);
    return false;
  }

  switch (type) {
    case 'add':
      // 在数组开头添加新元素
      target.unshift(matcher);
      break;
    case 'remove':
      // 删除匹配的元素
      arrRemove(target, matcher);
      break;
    case 'upgrade':
      // 获取第一个匹配元素的索引
      const index = getFirstIndexFromArr(target, matcher);
      // 更新匹配元素的值
      target[index] = value;
      break;
    default:
      break;
  }

  // 更新成功
  return true;
};

/**
 * @author FEN
 * @description 统计数组中的某几个字段的累加值
 * @param arr
 * @param sumKeys
 * @param filter
 * @param type
 * */
export function getSumFromArr(arr: {}[], sumKeys: string[], filter?: {} | Function, type: 'part' | 'all' = 'all'): { [K: string]: number } {
  const res = {};
  if (arr.length === 0) {
    sumKeys.forEach((key) => {
      // @ts-ignore
      res[key] = 0;
    });
  }
  arr.forEach((item) => {
    if (filter) {
      const filterRes = filter && matchType(item, filter, false);
      const resType = {
        part: 'part',
        all: true,
      };
      if (filterRes !== resType[type]) {
        sumKeys.forEach((key) => {
          // @ts-ignore
          res[key] = numberComputer(res[key] ? res[key] : 0, '+', 0);
        });
        return;
      }
    }

    sumKeys.forEach((key) => {
      // @ts-ignore
      res[key] = numberComputer(res[key] ? res[key] : 0, '+', item[key]);
    });
  });
  return res;
}
