import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { YourIIDProvider } from "./context/YourIIDContext.tsx";
import { registerServiceWorker } from "./lib/registerServiceWorker.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <LanguageProvider>
      <YourIIDProvider>
        <App />
      </YourIIDProvider>
    </LanguageProvider>
  </HelmetProvider>
);

registerServiceWorker();
