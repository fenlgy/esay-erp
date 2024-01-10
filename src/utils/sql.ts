import { isArray, isObject } from "@/utils/is.ts";

function getKeyCell(params: Record<string, string | number> | Record<string, string | number>[]) {
  const pairs = [];
  if (isObject(params)) {
    for (const key in params) {
      pairs.push(`${key} = '${params[key]}'`);
    }
  }
  return pairs;
}

export const getSqlFromParams = (params: Record<string, string | number> | Record<string, string | number>[]) => {
  // {key1:1,key2:2} => key1 = 1 AND key2 = 2
  if (isObject(params)) {
    return getKeyCell(params).join(" AND ");
  }

  // [{key:1},{key:2}] => key = 1 OR key =2
  if (isArray(params)) {
    let res = "";
    params.forEach((item, index) => {
      if (index === 0) {
        res += getKeyCell(item).join(" AND ");
      } else {
        res += " OR " + getKeyCell(item).join(" OR ");
      }
    });
    return res;
  }
};
