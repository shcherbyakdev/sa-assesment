import { vi } from "vitest";
import type { UseQueryResult } from "@tanstack/react-query";

const defaultQueryResult = {
  data: undefined,
  dataUpdatedAt: 0,
  error: null,
  errorUpdateCount: 0,
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  fetchStatus: "idle" as const,
  isError: false,
  isFetched: false,
  isFetchedAfterMount: false,
  isFetching: false,
  isLoading: false,
  isLoadingError: false,
  isPaused: false,
  isPending: false,
  isPlaceholderData: false,
  isRefetching: false,
  isRefetchError: false,
  isStale: false,
  isSuccess: false,
  refetch: vi.fn(() =>
    Promise.resolve({ data: undefined, isError: false, error: null })
  ),
  status: "loading" as const,
};

export function createQueryResult<TData, TError = Error>(
  options: Partial<UseQueryResult<TData, TError>> = {}
): UseQueryResult<TData, TError> {
  return {
    ...defaultQueryResult,
    ...options,
  } as UseQueryResult<TData, TError>;
}

export const queryStates = {
  loading: <TData, TError = Error>() =>
    createQueryResult<TData, TError>({
      isLoading: true,
      isPending: true,
      status: "pending",
      fetchStatus: "fetching",
    }),

  success: <TData, TError = Error>(data: TData) =>
    createQueryResult<TData, TError>({
      data,
      isSuccess: true,
      status: "success",
      fetchStatus: "idle",
    }),

  error: <TData, TError = Error>(error: TError) =>
    createQueryResult<TData, TError>({
      error,
      isError: true,
      status: "error",
      fetchStatus: "idle",
    }),
};
