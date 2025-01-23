// components/Providers.tsx

"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#4CAF50",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#f44336",
              color: "#fff",
            },
          },
        }}
      />
    </SessionProvider>
  );
};

export default Provider;
