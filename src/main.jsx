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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Add the basename prop here. It must match your repo name exactly. */}
    <BrowserRouter basename="/Brilliant">
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