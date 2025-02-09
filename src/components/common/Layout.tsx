import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 overflow-auto">
    <div className="min-h-full w-full max-w-3xl mx-auto p-4 md:p-8 space-y-6">
      {children}
    </div>
  </div>
);
