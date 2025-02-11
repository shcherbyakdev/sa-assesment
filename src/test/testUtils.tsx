import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext } from "../context/UserContext";
import type { User } from "../types/api";

interface WrapperProps {
  children: React.ReactNode;
}

// Create a new QueryClient for each test
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });

export const createWrapper = (user?: User) => {
  const testQueryClient = createTestQueryClient();

  return ({ children }: WrapperProps) => (
    <QueryClientProvider client={testQueryClient}>
      <UserContext.Provider value={{ user, isLoading: false, error: null }}>
        {children}
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export const renderWithProviders = (
  ui: React.ReactElement,
  user?: User,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(ui, {
    wrapper: createWrapper(user),
    ...options,
  });
};
