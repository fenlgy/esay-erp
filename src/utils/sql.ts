export const getSqlFromParams = (params: Record<string, string | number>) => {
  const pairs = [];
  for (const key in params) {
    pairs.push(`${key} = '${params[key]}'`);
  }
  return pairs.join("AND");
};

