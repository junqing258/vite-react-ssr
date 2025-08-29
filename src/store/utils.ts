import { StateCreator } from 'zustand';

// 用于创建带有 immer 支持的 store 切片
export type StoreSlice<T> = StateCreator<T, [], [], T>;

// 创建 store 的辅助函数
export const createStoreSlice = <T>(slice: StoreSlice<T>) => slice;

// 用于 SSR 的 store 初始化
export const initializeStore = <T>(store: any, initialState?: Partial<T>) => {
  // if (typeof window === 'undefined') return store;
  if (initialState) {
    store.setState(initialState, true);
  }

  return store;
};

// 获取初始状态的辅助函数
export const getInitialState = <T>(defaultState: T, ssrState?: Partial<T>): T => {
  if (typeof window === 'undefined') {
    return { ...defaultState, ...ssrState };
  }
  return defaultState;
};
