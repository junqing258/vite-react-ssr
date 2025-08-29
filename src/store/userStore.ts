import { createStore } from 'zustand'

export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  isLoggedIn: boolean;
}

export interface UserActions {
  login: (user: UserState) => void;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<UserState, 'name' | 'email'>>) => void;
}

export type UserProps = UserState & UserActions

export type UserStore = ReturnType<typeof createUserStore>




export const createUserStore = (initProps?: Partial<UserProps>) => {
  const DEFAULT_PROPS: UserState = {
    id: null,
    name: '',
    email: '',
    isLoggedIn: false,
  }
  return createStore<UserProps>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    login: (user: UserState) => set({ ...user }),
    logout: () => set({ id: null, name: '', email: '' }),
    updateProfile: (updates: Partial<Pick<UserState, "name" | "email">>) => set(updates),
  }))
}

