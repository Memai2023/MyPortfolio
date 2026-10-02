import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import App from "./App";
import { ThemeProvider } from "./features/theme/ThemeProvider";
import { LanguageProvider } from "./features/language/LanguageProvider";
import { AccessibilityProvider } from "./features/accessibility/AccessibilityProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <AccessibilityProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AccessibilityProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
