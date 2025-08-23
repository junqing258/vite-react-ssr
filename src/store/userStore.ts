import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserStore } from '../types/store';

// 用户 store
export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set, _get) => ({
        id: null,
        name: null,
        email: null,
        isLoggedIn: false,

        login: (user) => {
          return set(
            { ...user, isLoggedIn: true },
            false,
            'login'
          )
        },

        logout: () =>
          set(
            { id: null, name: null, email: null, isLoggedIn: false },
            false,
            'logout'
          ),

        updateProfile: (updates) =>
          set(
            (state) => ({ ...state, ...updates }),
            false,
            'updateProfile'
          ),
      }),
      {
        name: 'user-storage',
        version: 1,
        // 只持久化必要的用户信息
        /* partialize: (state) => ({
          id: state.id,
          name: state.name,
          email: state.email,
          isLoggedIn: !!state.id,
        }), */
      }
    ),
    {
      name: 'user-store',
    }
  )
);

