import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { XPProvider } from "./context/XPContext";
import { ProgressProvider } from "./context/ProgressContext";
import { StreakProvider } from "./context/StreakContext";
import { ThemeProvider } from "./context/ThemeContext";

import App from "./App";
import "./index.css";
import "./assets/styles/global.css";

// Use basename so BrowserRouter strips /Brilliant/ prefix before matching routes.
// - On GitHub Pages the app lives at /Brilliant/
// - In local dev with `vite --base /Brilliant/` the same prefix is used
// - If deployed at root (no base), set VITE_BASE_PATH="" and remove the basename
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <ThemeProvider>
        <AuthProvider>
          <XPProvider>
            <ProgressProvider>
              <StreakProvider>
                <App />
              </StreakProvider>
            </ProgressProvider>
          </XPProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
