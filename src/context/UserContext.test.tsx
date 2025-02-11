import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useUserContext, UserContext } from "./UserContext";
import type { User } from "../types/api";

describe("useUserContext", () => {
  const mockUser: User = {
    premium: true,
  };

  it("throws error when used outside of UserProvider", () => {
    // Wrap the renderHook call in expect to catch the error
    expect(() => {
      renderHook(() => useUserContext());
    }).toThrow("useUserContext must be used within a UserProvider");
  });

  it("returns context value when used within UserProvider", () => {
    const contextValue = {
      user: mockUser,
      isLoading: false,
      error: null,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    );

    const { result } = renderHook(() => useUserContext(), { wrapper });

    expect(result.current).toEqual(contextValue);
  });

  it("provides access to user premium status", () => {
    const contextValue = {
      user: mockUser,
      isLoading: false,
      error: null,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    );

    const { result } = renderHook(() => useUserContext(), { wrapper });

    expect(result.current.user?.premium).toBe(true);
  });
});
