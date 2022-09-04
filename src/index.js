import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SocketProvider } from "./context/SocketProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <SocketProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </SocketProvider> */}
  </React.StrictMode>
);
