import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import SurrealProvider from "@/modules/shared/infrastructure/surreal.provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SurrealProvider>
      <BrowserRouter basename="/encuesta">
        <App />
        <Toaster richColors={true} />
      </BrowserRouter>
    </SurrealProvider>
  </StrictMode>,
);
