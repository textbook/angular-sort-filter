export type Filterer<T> = (item: T) => boolean;

export const noOpFilterer: Filterer<any> = () => true;

export const createFieldFilterer: <T, K extends keyof T, R extends T[K]>(key: K, value: R) => Filterer<T> = (key, value) => {
  return item => item[key] === value;
};
