import { useUser } from "../api/queries";
import { ErrorPage } from "../components/common/ErrorPage";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { UserContext } from "../context/UserContext";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, error } = useUser();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
}
