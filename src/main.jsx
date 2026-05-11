import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider }  from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { GameProvider }  from "./context/GameContext";

import App from "./App";
import "./index.css";
import "./assets/styles/global.css";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <ThemeProvider>
        <AuthProvider>
          <GameProvider>
            <App />
          </GameProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
