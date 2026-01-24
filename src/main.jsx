import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { XPProvider } from "./context/XPContext";
import { ProgressProvider } from "./context/ProgressContext";
import { StreakProvider } from "./context/StreakContext";

import App from "./App";
import "./index.css";
import "./assets/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <XPProvider>
          <ProgressProvider>
            <StreakProvider>
              <App />
            </StreakProvider>
          </ProgressProvider>
        </XPProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
