import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import CategoriesComponent from "./components/categories/CategoriesComponent";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import ChuckNorrisApp from "./redux/reducers/reducers";

let store = createStore(ChuckNorrisApp, applyMiddleware(thunk, logger));

function App() {
  return <CategoriesComponent />;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
