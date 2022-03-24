export const flatten = (array: Array<any>): Array<any> => {
  if (array.length === 0) {
    return [];
  }

  const [front, ...rest] = array;

  if (Array.isArray(front)) {
    return [...flatten(front), ...flatten(rest)];
  }

  return [front, ...flatten(rest)];
};
