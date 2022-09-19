/* Top-level frontend script */

/* React modules */
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
