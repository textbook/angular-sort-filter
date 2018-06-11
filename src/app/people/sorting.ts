export type Sorter<T> = (a: T, b: T) => number;

export const noOpSorter: Sorter<any> = () => 0;

export const createFieldSorter: <T, K extends keyof T>(field: K) => Sorter<T> = (field) => (a, b) => {
  if (a[field] === b[field]) {
    return 0;
  } else if (a[field] > b[field]) {
    return 1;
  }
  return -1;
};
