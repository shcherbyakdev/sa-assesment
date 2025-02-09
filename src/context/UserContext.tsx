import { createContext, useContext } from "react";

import { User } from "../types/api";

interface UserContextType {
  user?: User;
  isLoading: boolean;
  error: Error | null;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
