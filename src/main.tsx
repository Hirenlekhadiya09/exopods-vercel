import React from "react";
import ReactDOM from "react-dom/client";
import UserCreditsProvider from "pages/contexts/UserCreditsContext";
import { Provider } from "react-redux";
import App from "./views/App";
import "./../src/styles/styles.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "context/AuthContext/AuthProvider";
import DockerProvider from "pages/contexts/dockerContext";
import { EmailConfirmationToastProvider } from "pages/contexts/emailConfirmationToastContext";
import store from "./store/store";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserCreditsProvider>
          <DockerProvider>
            <EmailConfirmationToastProvider>
            <Provider store={store}>
              <App />
              </Provider>
            </EmailConfirmationToastProvider>
          </DockerProvider>
        </UserCreditsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
