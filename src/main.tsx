import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Layout } from "./components/common/Layout.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";
import { UserProvider } from "./providers/UserProvider.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <Layout>
        <UserProvider>
          <App />
        </UserProvider>
      </Layout>
    </QueryProvider>
  </StrictMode>
);
