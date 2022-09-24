/* Top-level frontend script */

/* React modules */
import React from "react";
import ReactDOM from "react-dom";

/* Redux modules and reducer */
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./state/rootReducer";

/* Main component */
import App from "./components/App";

/* Render React app within Redux provider */
ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(rootReducer)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
