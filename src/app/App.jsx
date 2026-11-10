import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AppRouter } from "./router/AppRouter";
import { CountingLoader } from "@/features/landing/components/shared";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
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
