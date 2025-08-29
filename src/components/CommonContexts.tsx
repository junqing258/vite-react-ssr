import { createContext } from "react";
import { UserStore } from "../store/userStore";


export const PageContext = createContext<Record<string, any> | null>(null);

export const UserContext = createContext<UserStore | null>(null);