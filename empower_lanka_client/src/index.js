import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthAdminContextProvider } from "./context/authAdminContext";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <AuthAdminContextProvider>
          <App />
        </AuthAdminContextProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
