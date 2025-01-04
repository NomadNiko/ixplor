import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    flow="implicit"
  >
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </GoogleOAuthProvider>
);
