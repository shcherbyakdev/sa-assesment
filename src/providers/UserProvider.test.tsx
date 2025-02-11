import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserProvider } from "./UserProvider";
import { useUser } from "../api/hooks";
import { queryStates } from "../test/helpers";
import type { User } from "../types/api";

vi.mock("../api/hooks", () => ({
  useUser: vi.fn(),
}));

describe("UserProvider", () => {
  const mockUser: User = {
    premium: true,
  };

  it("shows loading spinner when loading", () => {
    vi.mocked(useUser).mockReturnValue(queryStates.loading<User>());

    render(
      <UserProvider>
        <div>Child content</div>
      </UserProvider>
    );

    // Check for loading spinner elements
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(screen.queryByText("Child content")).not.toBeInTheDocument();
  });

  it("shows error page when there is an error", () => {
    const error = new Error("Failed to fetch user");
    vi.mocked(useUser).mockReturnValue(queryStates.error<User>(error));

    render(
      <UserProvider>
        <div>Child content</div>
      </UserProvider>
    );

    // Check for error page elements
    expect(screen.getByText("Error Loading Data")).toBeInTheDocument();
    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(screen.getByText("Try Again")).toBeInTheDocument();

    expect(screen.queryByText("Child content")).not.toBeInTheDocument();
  });

  it("renders children when user data is loaded", () => {
    vi.mocked(useUser).mockReturnValue(queryStates.success(mockUser));

    render(
      <UserProvider>
        <div>Child content</div>
      </UserProvider>
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("Error Loading Data")).not.toBeInTheDocument();
  });
});
