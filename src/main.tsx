import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import SurrealProvider from "@/modules/shared/infrastructure/surreal.provider";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SurrealProvider>
      <ThemeProvider storageKey="encuesta.2025-1.vite-ui-theme">
        <BrowserRouter basename="/encuesta-2025-1">
          <App />
          <Toaster richColors={true} />
        </BrowserRouter>
      </ThemeProvider>
    </SurrealProvider>
  </StrictMode>,
);
