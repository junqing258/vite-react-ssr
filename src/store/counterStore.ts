import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CounterStore } from '../types/store';

// 计数器 store
export const useCounterStore = create<CounterStore>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }), false, 'increment'),
      decrement: () => set((state) => ({ count: state.count - 1 }), false, 'decrement'),
      reset: () => set({ count: 0 }, false, 'reset'),
    }),
    {
      name: 'counter-store',
    }
  )
);
