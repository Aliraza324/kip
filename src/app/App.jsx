import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { AppRouter } from "./router/AppRouter";
import { CountingLoader } from "@/features/landing/components/shared";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#1e293b",
            color: "#fff",
            fontSize: "13px",
            borderRadius: "16px",
            padding: "12px 18px",
          },
          error: {
            iconTheme: {
              primary: "#f43f5e",
              secondary: "#fff",
            },
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
        }}
      />
      <AnimatePresence mode="wait">
        {isLoading && (
          <CountingLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <AppRouter />
    </>
  );
};

export default App;
