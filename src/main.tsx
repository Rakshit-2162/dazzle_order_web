import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";
import "./index.css";
import "./i18n.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter
        basename={
          process.env.NODE_ENV === "production" ? "/dazzle_order_web" : "/"
        }
      >
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
